import React from 'react'

class Home extends React.Component {
  render() {
    return (
      <div>
        <h3>ようこそ</h3>
        <p>カテゴリごとにコメントを投稿しましょう。</p>
        <p>新しいカテゴリがほしい？管理者に作成を依頼しましょう。</p>
        <h3>はじめに</h3>
        <p>当掲示板はCookieを使用します。使用目的は以下の通りです。</p>
        <li>自身の投稿を非表示にする機能を提供するため。</li>
        <li>ログイン機能を提供するため。</li>
      </div>
    )
  }
}

export default Home