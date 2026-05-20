#!/bin/bash
# Harness initialization — Design System School.
# 이 프로젝트엔 별도 test runner가 없다. lint + typecheck + build가 사실상의 test 게이트다.
# 한 명령으로 의존성 설치와 모든 검증을 직렬로 돌려, fails fast하게 깨진 부분을 드러낸다.
set -e

echo "=== Harness Initialization · Design System School ==="

# 스크립트 위치 기준으로 프로젝트 루트 고정 (경로 공백 안전).
cd "$(dirname "$0")"

echo ""
echo "=== Step 1/4 · npm install ==="
npm install

echo ""
echo "=== Step 2/4 · npm run lint ==="
npm run lint

echo ""
echo "=== Step 3/4 · npm run typecheck ==="
npm run typecheck

echo ""
echo "=== Step 4/4 · npm run build (SSG가 모든 페이지를 prerender — 사실상의 회귀 test) ==="
npm run build

echo ""
echo "=== Verification Complete · clean restart ready ==="
echo ""
echo "Next steps for the agent:"
echo "  1. Read feature_list.json — pick the feature with status: active."
echo "  2. Read progress.md — see Current State and Recommended Next Step."
echo "  3. Read session-handoff.md — pick up decisions and open questions from the last session."
echo "  4. Stay in scope: touch only the active feature. New ideas → planned entry in feature_list.json."
echo "  5. Before claiming done: re-run ./init.sh, record evidence, update progress.md and session-handoff.md."
