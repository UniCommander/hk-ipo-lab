// ============================================
// IPO 作战参谋部 - 仪表盘逻辑
// ============================================

let projects = [];
let selectedForCompare = [];
let macroData = {};

// ============================================
// 初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    loadMacroData();
    loadProjects();
});

// ============================================
// 标签切换
// ============================================
function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
        });
    });
}

// ============================================
// 宏观数据加载（手动更新，当前为占位数据）
// ============================================
function loadMacroData() {
    macroData = {
        fedProb: { value: '~50%', trend: 'neutral', note: '年内降息概率约五成' },
        us10y: { value: '4.85%', trend: 'negative', note: '维持高位，压制成长股' },
        usdhkd: { value: '7.837', trend: 'neutral', note: '尚未触及7.85底线' },
        hstechPE: { value: '22.3x', trend: 'positive', note: '历史32%分位，估值偏低' },
        ipoVolume: { value: '~320亿', trend: 'positive', note: 'Q2维持活跃' },
        uscn: { value: '制度化', trend: 'negative', note: '无新增重大制裁' }
    };
    renderMacroDashboard();
}

function renderMacroDashboard() {
    const mapping = {
        fedProb: ['fed-prob', 'fed-trend'],
        us10y: ['us10y', 'us10y-trend'],
        usdhkd: ['usdhkd', 'usdhkd-trend'],
        hstechPE: ['hstech-pe', 'hstech-trend'],
        ipoVolume: ['ipo-volume', 'ipo-trend'],
        uscn: ['uscn-tension', 'uscn-trend']
    };

    Object.entries(mapping).forEach(([key, [valueId, trendId]]) => {
        const d = macroData[key];
        document.getElementById(valueId).textContent = d.value;
        const trendEl = document.getElementById(trendId);
        trendEl.textContent = d.note;
        trendEl.className = `trend ${d.trend}`;
    });

    // 简易评分逻辑
    const scores = Object.values(macroData).map(d => {
        if (d.trend === 'positive') return 2;
        if (d.trend === 'neutral') return 1;
        return 0;
    });
    const total = scores.reduce((a, b) => a + b, 0);
    document.getElementById('macro-score').textContent = `${total}/12`;

    const positives = Object.entries(macroData).filter(([_, d]) => d.trend === 'positive');
    const negatives = Object.entries(macroData).filter(([_, d]) => d.trend === 'negative');
    document.getElementById('macro-positive').innerHTML = `<strong>正向因子：</strong>${positives.map(([k]) => k).join(', ') || '无'}`;
    document.getElementById('macro-negative').innerHTML = `<strong>负向因子：</strong>${negatives.map(([k]) => k).join(', ') || '无'}`;
    document.getElementById('macro-guidance').innerHTML = total >= 8 ? '<strong>策略指引：</strong>积极参与，优选有利润支撑的资产' : '<strong>策略指引：</strong>谨慎参与，聚焦防御性赛道';
}

// ============================================
// 项目加载
// ============================================
function loadProjects() {
    fetch('data/projects.json')
        .then(res => res.json())
        .then(data => {
            projects = data;
            populateFilters();
            renderProjects();
        })
        .catch(() => {
            document.getElementById('project-list').innerHTML = '<p style="color:#8b949e;padding:20px;">暂无项目数据。请先在 data/projects.json 中添加项目记录。</p>';
        });
}

function populateFilters() {
    const sectors = [...new Set(projects.map(p => p.sector))];
    const sectorSelect = document.getElementById('filter-sector');
    sectors.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        sectorSelect.appendChild(opt);
    });

    document.getElementById('filter-sector').addEventListener('change', renderProjects);
    document.getElementById('filter-rating').addEventListener('change', renderProjects);
    document.getElementById('sort-by').addEventListener('change', renderProjects);
    document.getElementById('search-box').addEventListener('input', renderProjects);
    document.getElementById('btn-compare').addEventListener('click', showCompare);
    document.getElementById('btn-close-compare').addEventListener('click', hideCompare);
    document.getElementById('btn-export').addEventListener('click', exportReport);
}

// ============================================
// 项目渲染
// ============================================
function renderProjects() {
    let filtered = [...projects];

    const sector = document.getElementById('filter-sector').value;
    if (sector !== 'all') filtered = filtered.filter(p => p.sector === sector);

    const rating = document.getElementById('filter-rating').value;
    if (rating !== 'all') filtered = filtered.filter(p => p.rating === rating);

    const search = document.getElementById('search-box').value.toLowerCase();
    if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search));

    const sortBy = document.getElementById('sort-by').value;
    if (sortBy === 'date') filtered.sort((a, b) => b.date.localeCompare(a.date));
    if (sortBy === 'rating') filtered.sort((a, b) => a.rating.localeCompare(b.rating));
    if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name, 'zh'));

    const container = document.getElementById('project-list');
    container.innerHTML = filtered.map(p => `
        <div class="project-card">
            <div class="project-header" onclick="toggleDetail(${p.id})">
                <input type="checkbox" value="${p.id}" onclick="event.stopPropagation(); toggleSelect(${p.id})">
                <span class="project-name">${p.name}</span>
                <span class="badge rating-${p.rating.toLowerCase()}">${p.rating}</span>
                <span class="badge sector">${p.sector}</span>
                <span style="color:#8b949e;font-size:12px;margin-left:auto;">${p.date} | ${p.status}</span>
            </div>
            <div class="project-detail" id="detail-${p.id}">
                <table>
                    <tr><td>宏观驱动</td><td>${p.macroDrivers.join('；')}</td></tr>
                    <tr><td>宏观风险</td><td>${p.macroRisks.join('；')}</td></tr>
                    <tr><td>基石</td><td>${p.cornerstone || '暂无数据'}</td></tr>
                    <tr><td>营收</td><td>${p.revenue || '暂无数据'}</td></tr>
                    <tr><td>关键问题</td><td>${p.keyQuestions.map(q => `• ${q}`).join('<br>')}</td></tr>
                    ${p.noteLink ? `<tr><td>完整笔记</td><td><a href="${p.noteLink}" target="_blank">查看 →</a></td></tr>` : ''}
                </table>
            </div>
        </div>
    `).join('');

    selectedForCompare = [];
    document.getElementById('btn-compare').disabled = true;
}

// ============================================
// 交互函数
// ============================================
function toggleDetail(id) {
    const el = document.getElementById(`detail-${id}`);
    if (el) el.classList.toggle('open');
}

function toggleSelect(id) {
    if (selectedForCompare.includes(id)) {
        selectedForCompare = selectedForCompare.filter(i => i !== id);
    } else {
        if (selectedForCompare.length >= 3) {
            alert('最多选择3个项目对比');
            return;
        }
        selectedForCompare.push(id);
    }
    document.getElementById('btn-compare').disabled = selectedForCompare.length === 0;
}

function showCompare() {
    const selected = projects.filter(p => selectedForCompare.includes(p.id));
    if (selected.length === 0) return;

    const panel = document.getElementById('compare-panel');
    const table = document.getElementById('compare-table');

    const rows = ['sector', 'rating', 'macroDrivers', 'macroRisks', 'cornerstone', 'revenue'];
    const labels = { sector: '赛道', rating: '评级', macroDrivers: '宏观驱动', macroRisks: '宏观风险', cornerstone: '基石', revenue: '营收' };

    let html = '<table><tr><th>指标</th>';
    selected.forEach(p => html += `<th>${p.name}</th>`);
    html += '</tr>';

    rows.forEach(row => {
        html += `<tr><td>${labels[row]}</td>`;
        selected.forEach(p => {
            const val = p[row];
            html += `<td>${Array.isArray(val) ? val.join('；') : (val || '--')}</td>`;
        });
        html += '</tr>';
    });
    html += '</table>';

    table.innerHTML = html;
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth' });
}

function hideCompare() {
    document.getElementById('compare-panel').style.display = 'none';
}

function exportReport() {
    const sector = document.getElementById('filter-sector').value;
    const rating = document.getElementById('filter-rating').value;
    let filtered = [...projects];
    if (sector !== 'all') filtered = filtered.filter(p => p.sector === sector);
    if (rating !== 'all') filtered = filtered.filter(p => p.rating === rating);

    let report = 'IPO作战参谋部 - 项目报告\n';
    report += `导出时间：${new Date().toISOString().split('T')[0]}\n`;
    report += `筛选条件：赛道=${sector}, 评级=${rating}\n`;
    report += '='.repeat(50) + '\n\n';

    filtered.forEach(p => {
        report += `【${p.rating}】${p.name} | ${p.sector} | ${p.date}\n`;
        report += `宏观驱动：${p.macroDrivers.join('；')}\n`;
        report += `宏观风险：${p.macroRisks.join('；')}\n`;
        report += `关键问题：\n${p.keyQuestions.map(q => `  - ${q}`).join('\n')}\n`;
        report += '\n';
    });

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ipo-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}
