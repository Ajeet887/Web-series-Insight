# AI & NLP Methodology

## 1. Natural Language Processing (NLP) Pipeline
The project uses a custom-built NLP pipeline to transform unstructured text data (reviews) into structured insights.

### Phase 1: Sentiment Analysis
Using the `sentiment` library based on AFINN-165, the system calculates a sentiment score for each review.
*   **Normalization**: Raw scores are mapped to a 0-1 scale.
*   **Classification**: Reviews are categorized as Positive, Negative, or Neutral based on intensity thresholds.

### Phase 2: Topic Extraction & POS Tagging
Using the `Compromise` library, the system performs Part-of-Speech (POS) tagging:
*   **Nouns**: Extracted as potential topics (e.g., "pacing", "acting", "cliffhanger").
*   **Adjectives**: Extracted to identify the emotional tone (e.g., "thrilling", "predictable", "slow").

### Phase 3: Qualitative Theme Generation
This is the core of the "WHY" engine. Instead of showing percentages, the system generates human-readable strings:
1.  **Frequency Analysis**: It identifies the most common nouns, adjectives, and keywords across all reviews for a series.
2.  **Context Matching**: If a noun (e.g., "story") appears frequently in positive reviews, it generates: *"Strong story elements that engage viewers."*
3.  **Intensity Mapping**: If an adjective (e.g., "boring") appears in negative reviews, it generates: *"Boring tone detracts from the experience."*

## 2. Recommendation Engine (Explainable AI)
The recommendation logic is based on **Content-Based Filtering with Semantic Reasoning**:
*   **Vectorization**: Series are represented by a vector of genres, keywords, and AI insights.
*   **Matching**: User preferences are matched against the "Content DNA" (pacing, complexity, depth).
*   **Reasoning**: The system doesn't just suggest a show; it uses the extracted topics to explain: *"We recommend this because you enjoy character-driven dramas with fast pacing."*

## 3. Emotion Timeline (Symbolic AI)
The "Emotion Timeline" is a symbolic representation of the viewer's journey:
*   **Data Structure**: A sequential array of episode-level emotional data (curiosity, anxiety, excitement).
*   **Visualization**: Represented as a multi-line chart using `Chart.js`, allowing users to see exactly where a series peaks in intensity.
