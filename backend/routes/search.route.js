import express, { Router } from 'express'
import { getSearchHistory, RemoveItemFromSearchHistory, searchMovie, searchPerson, searchTv } from '../controller/search.controller.js';

const router = express.Router();

router
.get('/person/:query', searchPerson)
.get('/movie/:query', searchMovie)
.get('/tv/:query', searchTv)


.get('/history', getSearchHistory)
.delete('/history/:id', RemoveItemFromSearchHistory)





export default router