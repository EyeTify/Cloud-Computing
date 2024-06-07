const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8080;
const API_KEY = '7bc0c932b3fc4fd1a7071689733fd39d';

let cachedNews = [];


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health-news', async (req, res) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${API_KEY}`);
        cachedNews = response.data.articles;
        res.json(cachedNews);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

app.get('/search-articles', (req, res) => {
    const query = req.query.title;
    console.log('Query Title:', query);
    if (!query) {
        return res.status(400).json({ error: true, message: 'Title query parameter is required' });
    }
    const filteredArticles = cachedNews.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase())
    );
    if (filteredArticles.length === 0) {
        return res.status(404).json({ error: true, message: 'Article Not Found' });
    }

    const result = {
        total_count: filteredArticles.length,
        incomplete_results: false,
        items: filteredArticles.map(article => ({
            title: article.title,
            url: article.url
        }))
    };

    res.json(result);
});

app.post('/search-articles', (req, res) => {
    const query = req.body.title;
    console.log('Query Title:', query);
    if (!query) {
        return res.status(400).json({ error: true, message: 'Title field is required in request body' });
    }
    const filteredArticles = cachedNews.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase())
    );
    if (filteredArticles.length === 0) {
        return res.status(404).json({ error: true, message: 'Article Not Found' });
    }

    const result = {
        total_count: filteredArticles.length,
        incomplete_results: false,
        items: filteredArticles.map(article => ({
            title: article.title,
            url: article.url
        }))
    };

    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
