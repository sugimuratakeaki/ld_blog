import React from 'react';
import { Layout } from '@/components/templates/Layout';
import { Button } from '@/components/atoms/Button';
import {
  getDashboardStats,
  getRecentArticles,
  getRecentActivities,
} from '@/data/mockData';
import type { PageProps, Article, Activity } from '@/types';

export interface DashboardProps extends PageProps {}

export const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  const stats = getDashboardStats();
  const recentArticles = getRecentArticles();
  const recentActivities = getRecentActivities();

  return (
    <Layout title="ダッシュボード">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">ダッシュボード</h1>
        <p className="page-description">ブログの状況を一目で確認できます</p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon primary">📝</div>
          <div className="stat-content">
            <div className="stat-label">総記事数</div>
            <div className="stat-value">{stats.totalArticles}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">✅</div>
          <div className="stat-content">
            <div className="stat-label">公開中</div>
            <div className="stat-value">{stats.published}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">📅</div>
          <div className="stat-content">
            <div className="stat-label">予約投稿</div>
            <div className="stat-value">{stats.scheduled}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon info">📄</div>
          <div className="stat-content">
            <div className="stat-label">下書き</div>
            <div className="stat-value">{stats.drafts}</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard-recent">
        {/* Recent Articles */}
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">最近の記事</h2>
            <Button className="btn btn-sm btn-outline">すべて見る</Button>
          </div>
          <div className="dashboard-section-body">
            <div className="article-list">
              {recentArticles.map((article: Article) => (
                <div key={article.id} className="article-card">
                  <img 
                    src={article.thumbnail} 
                    alt="記事サムネイル" 
                    className="article-card-image"
                  />
                  <div className="article-card-content">
                    <h3 className="article-card-title">{article.title}</h3>
                    <div className="article-card-meta">
                      <span className={`badge badge-${article.statusClass}`}>
                        {article.statusLabel}
                      </span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">クイックアクション</h2>
          </div>
          <div className="dashboard-section-body">
            <div className="btn-group" style={{ flexDirection: 'column', width: '100%' }}>
              <Button className="btn btn-primary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px' }}>
                  <path d="M8 4v8m-4-4h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                新規記事を作成
              </Button>
              <Button className="btn btn-secondary">
                <span style={{ marginRight: '8px' }}>🖼️</span>
                画像をアップロード
              </Button>
              <Button className="btn btn-secondary">
                <span style={{ marginRight: '8px' }}>📁</span>
                カテゴリーを追加
              </Button>
              <Button className="btn btn-secondary">
                <span style={{ marginRight: '8px' }}>🏷️</span>
                タグを管理
              </Button>
              <Button className="btn btn-secondary">
                <span style={{ marginRight: '8px' }}>📊</span>
                アクセス解析を見る
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="dashboard-section" style={{ marginTop: 'var(--space-3)' }}>
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">最近のアクティビティ</h2>
        </div>
        <div className="dashboard-section-body">
          <div className="activity-timeline">
            {recentActivities.map((activity: Activity, index: number) => (
              <div 
                key={index} 
                className="activity-item" 
                style={{ 
                  display: 'flex', 
                  padding: 'var(--space-2) 0', 
                  borderBottom: index < recentActivities.length - 1 ? '1px solid var(--border-gray)' : 'none' 
                }}
              >
                <div 
                  className={`activity-icon ${activity.iconClass}`}
                  style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    borderRadius: 'var(--radius-full)', 
                    backgroundColor: `var(--${activity.iconClass}-${
                      activity.iconClass === 'primary' ? 'blue' : 
                      activity.iconClass === 'success' ? 'green' : 
                      activity.iconClass === 'warning' ? 'yellow' : 
                      'turquoise'
                    }-light)`, 
                    color: `var(--${activity.iconClass}-${
                      activity.iconClass === 'primary' ? 'blue' : 
                      activity.iconClass === 'success' ? 'green' : 
                      activity.iconClass === 'warning' ? 'yellow' : 
                      'turquoise'
                    })`, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: 'var(--space-2)' 
                  }}
                >
                  {activity.icon}
                </div>
                <div className="activity-content" style={{ flex: 1 }}>
                  <div className="activity-title" style={{ fontWeight: 'var(--font-medium)', marginBottom: '0.4rem' }}>
                    {activity.title}
                  </div>
                  <div className="activity-time" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-disabled)' }}>
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};