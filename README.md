# threejs-material
影をつけるのは[こっち](https://github.com/Yuki-Sakaguchi/threejs-shadow)で色々やったのでそれを参考に、次はマテリアルを色々操作して遊ぶ



## 立方体をふわふわアニメーションさせる(part1)
https://yuki-sakaguchi.github.io/threejs-material/part1/dist/

- 地平線をオブジェクトで作るのはカメラ的にも難しそうだったので、床の色を取得してcssで背景に置いた
- 上下の動きは `Math.sin()` で回転は適当
