# Learn about Three.js

demo<br>
https://spoon-inoue.github.io/three-learn/

概要<br>
https://www.figma.com/file/XcZzaV0GOjWi0OtGy78f1M/WebGL?node-id=0%3A1

## step1：基本的なシーンの作成

- sample を元に作成

Reference<br>
- [雛形にしたサンプル](https://github.com/mrdoob/three.js/blob/master/examples/webgl_raycaster_bvh.html)

## step2：抽象化

- TCanvasBase の作成

## step3：ライティングと影

## step4：Lerp

- wheel イベントを利用した回転
- stats の追加
- gui の追加

## step5：Shader

- onBeforeCompile で Material の中身を覗く
- uv マッピング
- fresnel 反射

Reference<br>
- [WebGLProgram](https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram)
- [GLSL (OpenGL ES2.0)リファレンス](https://gist.github.com/gyohk/abf13dbcb5be750b3b021752b280ccd3)

## step6：Built-in Material の拡張

- onBeforeCompile

Reference<br>
- [ShaderLib](https://github.com/mrdoob/three.js/tree/dev/src/renderers/shaders/ShaderLib)
- [ShaderChunk](https://github.com/mrdoob/three.js/tree/master/src/renderers/shaders/ShaderChunk)

# ---------------（以下、未定）---------------
## step7：テクスチャー

- sRGBConvert
- Shader で使う
- metalness=1

## step8：オフスクリーンレンダリング

## step9：PostProcessing

## step10：GPGPU

## step11：spoon サイトの particle のクローンを作る
