# hk-ipo-lab
analyst of hk-ipo-market, belongs to Uni

# IPO 策略评分系统 (HK-IPO-Lab)
## 它是干什么的？

用 AI（Gemini）辅助我做港股IPO的宏观策略研究。我只负责三件事：定框架、下命令、做判断。 

## 核心研究框架 (v2.0)

一个框架，适配所有阶段。输入多少信息，输出多深结论。

**五层架构：**
1.  **宏观环境评分卡**：当前适不适合参与港股IPO？仓位多高？
2.  **赛道评估与竞品对标**：赛道在宏观周期里处于什么位置？可比公司估值如何？
3.  **发行人主体评估**：业务模式、财务、股东、IPO条款。
4.  **二级市场定价锚**：合理估值区间、发行价判断、首日情景分析。
5.  **特殊因子**：政策、地缘、事件驱动等加减分项。

**三阶段分层执行：**
*   **S1 早期（无招股书）**：轻量预研，半页简报。只做赛道定性、业务素描和股东背景。
*   **S2 文件期（有招股书）**：标准执行。完整五层分析，缺价格时以可比公司法估锚。
*   **S3 招股期（价格/基石已出）**：快速决策。聚焦定价判断和最终参与建议。

## 工作流
1.  **更新宏观环境**：用 `prompts/prompt_macro_update.txt` 获取最新宏观指标。
2.  **AI 生成初稿**：选择项目阶段对应的 Prompt，让 Gemini 产出原始报告。
3.  **人工审阅点睛**：补充待验证假设和 ECM 沟通话术，形成最终笔记。
4.  **存档与展示**：笔记存入 `research_notes/`，项目摘要更新进 `data/projects.json`，仪表盘自动同步。

## 仓库结构
* hk-ipo-lab/
* ├── index.html # 仪表盘主页 (筛选/排序/对比)
* ├── css/ # 仪表盘样式
* ├── js/ # 仪表盘交互逻辑
* ├── data/
* │ └── projects.json # 项目数据库 (手动维护)
* ├── framework/ # 研究框架 (你的核心IP)
* │ ├── 01_宏观评分卡.md
* │ └── 02_研究总框架_v2.md
* ├── prompts/ # AI 指令库 (你的专属弹药)
* │ ├── prompt_macro_update.txt
* │ ├── prompt_sector_scan.txt
* │ ├── prompt_ipo_deepdive.txt
* │ └── prompt_pre_ipo_scan.txt
* ├── research_notes/ # 最终成品笔记 (AI信息+你的判断)
* └── raw_ai_outputs/ # Gemini 原始输出 (留底备查)

## 核心纪律
*   **只做研究员，不做决策者。**
*   **只展示思考，不做任何承诺。**
*   **所有笔记均为个人资产。**

## 技术栈
*   **版本控制与展示**：GitHub + GitHub Pages
*   **AI 研究助手**：Google Gemini (网页版，手动模式，后续或有调整)
*   **数据格式**：Markdown (笔记) + JSON (数据库)

##English version
# IPO Ranking System (HK-IPO-Lab)
> A private macro-strategy research system. Objective: One person, one army.

## What It Does
Leverages AI (Gemini) to conduct macro-strategy research on HK IPOs. My role: design frameworks, issue commands, and make judgments. All outputs are personal research assets.

## Core Research Framework (v2.0)
A single framework adaptable to all stages. Depth scales with available information.

**Five-Layer Architecture:**
1.  **Macro Scorecard**: Is the environment favorable for HK IPOs? What’s the recommended positioning?
2.  **Sector & Peer Benchmarking**: Where does the sector sit in the macro cycle? How do comparable companies trade?
3.  **Issuer Assessment**: Business model, financials, shareholders, IPO terms.
4.  **Secondary Market Anchor**: Fair valuation range, offering price assessment, first-day scenario analysis.
5.  **Special Factors**: Policy catalysts, geopolitical variables, event-driven risks.

**Three-Stage Execution:**
*   **Stage 1 – Pre-Filing (No Prospectus)**: Lightweight pre-research. Qualitative sector and business sketch only.
*   **Stage 2 – Filed/Listed Hearing (Prospectus Available)**: Standard execution. Full five-layer analysis using comparable company valuation if pricing absent.
*   **Stage 3 – Offering Period (Price/Cornestone Available)**: Rapid decision. Focus on pricing judgment and final participation recommendation.

## Workflow
1.  **Update Macro View**: Run `prompts/prompt_macro_update.txt` in Gemini for the latest indicators.
2.  **Generate AI Draft**: Use the stage-appropriate Prompt with Gemini to produce a raw report.
3.  **Add Alpha**: Supplement with hypotheses to verify and ECM talking points; finalize the note.
4.  **Archive & Display**: Save the final note in `research_notes/`, update the project summary in `data/projects.json`. The dashboard refreshes automatically.

## Repo Structure
* hk-ipo-lab/
* ├── index.html # Dashboard (Filter/Sort/Compare)
* ├── css/ # Styles
* ├── js/ # Interaction logic
* ├── data/
* │ └── projects.json # Project database (manual)
* ├── framework/ # Research frameworks (Core IP)
* │ ├── 01_Macro_Scorecard.md
* │ └── 02_Research_Framework_v2.md
* ├── prompts/ # AI prompt library
* │ ├── prompt_macro_update.txt
* │ ├── prompt_sector_scan.txt
* │ ├── prompt_ipo_deepdive.txt
* │ └── prompt_pre_ipo_scan.txt
* ├── research_notes/ # Final notes (AI data + your judgment)
* └── raw_ai_outputs/ # Raw Gemini outputs (archive)

## Core Principles
*   **Be a researcher, not a decision-maker.**
*   **Show thinking, make zero promises.**
*   **All notes are personal assets, unrelated to any firm.**

## Tech Stack
*   **Version Control & Display**: GitHub + GitHub Pages
*   **AI Research Assistant**: Google Gemini (Web, manual mode)
*   **Data Formats**: Markdown (notes) + JSON (database)

## Core Principles
*   **Be a researcher, not a decision-maker.**
*   **Show thinking, make zero promises.**
*   **All notes are personal assets, unrelated to any firm.**

## Tech Stack
*   **Version Control & Display**: GitHub + GitHub Pages
*   **AI Research Assistant**: Google Gemini (Web, manual mode)
*   **Data Formats**: Markdown (notes) + JSON (database)   
