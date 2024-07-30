const createReviewCard = (review) => {
    const { name, date, review: userReview } = review;
    return `
      <div class="review-item">
        <div class="reviewer-item">
          <i class="fa-solid fa-circle-user"></i>
          <div class="reviewer">
            <p>${name}</p>
            <p>${date}</p>
          </div>
        </div>
        <div class="review-desc">
          <p>${userReview}</p>
        </div>
      </div>
    `;
};

export default createReviewCard;
