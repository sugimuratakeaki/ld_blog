#!/bin/bash

# 色付きのログ出力のための関数
log_info() {
    echo -e "\033[32m[INFO]\033[0m $1"
}

log_warn() {
    echo -e "\033[33m[WARN]\033[0m $1"
}

log_error() {
    echo -e "\033[31m[ERROR]\033[0m $1"
}

# ポート8070で動いているプロセスを強制終了
log_info "ポート8070で動いているプロセスをチェック中..."
PROCESS_PID=$(lsof -ti:8070)
if [ ! -z "$PROCESS_PID" ]; then
    log_warn "ポート8070でプロセス(PID: $PROCESS_PID)が動いています。強制終了します..."
    kill -9 $PROCESS_PID
    sleep 2
    
    # 再度チェック
    PROCESS_PID=$(lsof -ti:8070)
    if [ ! -z "$PROCESS_PID" ]; then
        log_error "プロセスの終了に失敗しました。手動で終了してください。"
        exit 1
    else
        log_info "プロセスを正常に終了しました。"
    fi
else
    log_info "ポート8070は空いています。"
fi

# プロジェクトディレクトリに移動
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

log_info "プロジェクトディレクトリ: $(pwd)"

# package.jsonの存在確認
if [ ! -f "package.json" ]; then
    log_error "package.jsonが見つかりません。正しいディレクトリで実行してください。"
    exit 1
fi

# Node.jsとnpmの確認
if ! command -v node &> /dev/null; then
    log_error "Node.jsがインストールされていません。"
    log_info "Node.jsをインストールしてください: https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    log_error "npmがインストールされていません。"
    exit 1
fi

log_info "Node.js version: $(node --version)"
log_info "npm version: $(npm --version)"

# 依存関係のインストール
log_info "依存関係をインストール中..."
npm install

if [ $? -ne 0 ]; then
    log_error "npm installに失敗しました。"
    exit 1
fi

log_info "依存関係のインストールが完了しました。"

# 環境変数の設定
export PORT=8070
export REACT_APP_USE_MOCK=true

log_info "環境変数を設定しました:"
log_info "  PORT=8070"
log_info "  REACT_APP_USE_MOCK=true"

# 開発サーバーの起動
log_info "React開発サーバーを起動中..."
log_info "アクセスURL: http://localhost:8070"
log_info "停止するにはCtrl+Cを押してください。"
log_info ""

# React開発サーバーを起動
npm start