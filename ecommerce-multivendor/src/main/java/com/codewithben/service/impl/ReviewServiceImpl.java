package com.codewithben.service.impl;

import com.codewithben.model.Product;
import com.codewithben.model.Review;
import com.codewithben.model.User;
import com.codewithben.repository.ReviewRepository;
import com.codewithben.request.CreateReviewRequest;
import com.codewithben.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    @Override
    public Review createReview(CreateReviewRequest req, User user, Product product) {
        Review review = new Review();
        review.setReviewText(req.getReviewText());
        review.setRating(req.getReviewRating());
        review.setProduct(product);
        review.setUser(user);
        review.setProductImages(req.getProductImages());

        product.getReviews().add(review);
        return reviewRepository.save(review);

    }

    @Override
    public List<Review> getReviewByProductId(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    @Override
    public Review updateReview(Long reviewId, String reviewText, double rating, Long userId) throws Exception {
        Review review = getReviewById(reviewId);

        if(review.getUser().getId().equals(userId)){
            review.setReviewText(reviewText);
            review.setRating(rating);
            return  reviewRepository.save(review);
        }
        throw new Exception("You can't update  this review");
    }

    @Override
    public void deleteReview(Long reviewId, Long userId) throws Exception {
        Review review = getReviewById(reviewId);
        if (!review.getUser().getId().equals(userId)) {
            throw new Exception("You can only delete your own review");
        }

        reviewRepository.delete(review);



    }

    @Override
    public Review getReviewById(Long reviewId) throws Exception {
        return reviewRepository.findById(reviewId).orElseThrow
                (()-> new Exception("review not found"));
    }


}
