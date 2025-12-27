# 🏎️ F1 Unpredictability Index

**A high-performance data visualization tool for analyzing Formula 1 circuit unpredictability using AI-synthesized historical data.**

The **F1 Unpredictability Index** leverages the **Google Gemini AI** engine to calculate a "Chaos Score" for iconic racing circuits. By analyzing weather volatility, safety car probability, and historical attrition rates, this dashboard answers the ultimate question: *Where will the chaos happen next?*

## ✨ Key Features

* **🧠 AI-Powered Analysis**: Uses Google's Gemini Pro model via `@google/genai` to generate real-time insights and historical context.
* **📊 Dynamic Chaos Scoring**: A proprietary 0-100 metric calculated based on:
    * Weather Volatility 🌧️
    * Safety Car Frequency ⚠️
    * Overtaking Difficulty 🏎️
    * DNF Rates ❌
* **📈 Interactive Charts**:
    * **Metric Radar**: Visualizes the balance of risk factors.
    * **Trend Lines**: Tracks how circuit unpredictability has evolved over seasons.
    * **Comparative Ranking**: Side-by-side comparison of multiple tracks.
* **🎨 F1 Telemetry UI**: A sleek, dark-mode interface inspired by official F1 graphics using `recharts` and `lucide-react`.

---

## 🛠️ Tech Stack

* **Frontend**: React 19, TypeScript
* **Build Tool**: Vite
* **Styling**: Tailwind CSS (Inferred), Lucide Icons
* **Data Visualization**: Recharts
* **AI Integration**: Google GenAI SDK (`@google/genai`)

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* A valid **Google Gemini API Key** (Get one at [Google AI Studio](https://aistudio.google.com/))

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/f1-unpredictability-index.git](https://github.com/your-username/f1-unpredictability-index.git)
    cd f1-unpredictability-index
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your API key:
    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```text
├── src/
│   ├── components/       # UI Components (CircuitCard, Charts, Layout)
│   ├── services/         # API handling (geminiService.ts)
│   ├── App.tsx           # Main application logic
│   ├── constants.ts      # Circuit data and color palettes
│   └── types.ts          # TypeScript interfaces
├── .env                  # Environment variables (API Key)
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts

🤝** Contributing**
Contributions are welcome!
Please follow these steps:
Fork the project.
Create your feature branch (git checkout -b feature/NewFeature).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/NewFeature).
Open a Pull Request.
