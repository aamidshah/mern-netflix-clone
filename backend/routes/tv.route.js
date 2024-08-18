import { Router } from "express"
import express from 'express' ;
import { getTVTrailers, getTrendingTv, getSimilarTvs, getTvsByCategory, getTvDetails } from "../controller/tv.controller.js";

const router = express(Router)

router.get('/trending', getTrendingTv)
router.get('/:id/trailers', getTVTrailers)
router.get('/:id/details', getTvDetails)
router.get('/:id/similar', getSimilarTvs)
router.get('/:category', getTvsByCategory)

export default router