import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
// 设计系统地基（来自 Claude Design 交付）：先 token 再基础组件，最后旧 main.css（共享 token 同值，无冲突）。
// 后续各屏逐步迁移到 .modal-card / .card / .btn / .chip / .label 等统一组件，旧样式过渡期保留。
import './styles/tokens.css';
import './styles/components.css';
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
