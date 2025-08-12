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

log_info "モックサーバーを停止中..."

# ポート8070で動いているプロセスを検索
PROCESS_PID=$(lsof -ti:8070)

if [ -z "$PROCESS_PID" ]; then
    log_info "ポート8070で動いているプロセスはありません。"
else
    log_warn "ポート8070でプロセス(PID: $PROCESS_PID)が動いています。停止します..."
    
    # まずは優雅に終了を試行
    kill $PROCESS_PID
    sleep 3
    
    # まだ動いているかチェック
    if kill -0 $PROCESS_PID 2>/dev/null; then
        log_warn "プロセスがまだ動いています。強制終了します..."
        kill -9 $PROCESS_PID
        sleep 2
    fi
    
    # 最終確認
    PROCESS_PID=$(lsof -ti:8070)
    if [ -z "$PROCESS_PID" ]; then
        log_info "モックサーバーを正常に停止しました。"
    else
        log_error "プロセスの終了に失敗しました。手動で終了してください。"
        log_info "手動終了コマンド: kill -9 $PROCESS_PID"
        exit 1
    fi
fi