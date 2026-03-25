const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');
const Expense = require('../models/Expense');

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

router.get('/', async (req, res) => {
    try {
        // get all expenses from database
        const expenses = await Expense.find();

        if(expenses.length === 0){
            return res.json({ 
                summary: 'No expenses found. Start adding expenses to get AI insights.' 
            });
        }

        // calculate some basic stats to include in prompt
        const total = expenses.reduce((sum, e) => sum + e.amount, 0);
        const byCategory = expenses.reduce((acc, e) => {
            acc[e.category] = (acc[e.category] || 0) + e.amount;
            return acc;
        }, {});

        // build the prompt
        const prompt = `You are a personal finance assistant. Analyse these expenses and give a brief, friendly, actionable summary.

Total expenses: KES ${total}
Number of expenses: ${expenses.length}

Spending by category:
${Object.entries(byCategory).map(([cat, amount]) => `- ${cat}: KES ${amount}`).join('\n')}

Individual expenses:
${expenses.map(e => `- ${e.title}: KES ${e.amount} (${e.category})`).join('\n')}

Give a 3-4 sentence summary covering:
1. Overall spending pattern
2. Highest spending category
3. One specific actionable suggestion to save money

Keep it conversational and specific to these numbers.`;

        // call anthropic api
        const message = await client.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1024,
            messages: [
                { role: 'user', content: prompt }
            ]
        });

        res.json({ summary: message.content[0].text });

    } catch(error) {
        console.log('AI summary error:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;