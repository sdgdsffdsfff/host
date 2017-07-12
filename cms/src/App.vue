<template>
  <div id="o2host" class="o2host">
    <router-view></router-view>
  </div>
</template>

<style>
html, body, div, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, ul, li, fieldset, form, label, input, legend, table, caption, tbody, tfoot, thead, tr, th, td, textarea, article, aside, audio, canvas, figure, footer, header, mark, menu, nav, section, time, video { margin: 0; padding: 0; }
/*article, aside, dialog, figure, footer, header, hgroup, nav, section, blockquote { display: block; }*/
ul, ol { list-style: none; }
img { border: 0 none; vertical-align: top; }
/*blockquote, q { quotes: none; }
blockquote:before, blockquote:after, q:before, q:after { content: none; }*/
table { border-collapse: collapse; border-spacing: 0; }
/*strong, em, i { font-style: normal; font-weight: normal; }*/
/*ins { text-decoration: underline; }
del { text-decoration: line-through; }*/
/*mark { background: none; }*/
input::-ms-clear { display: none !important; }
/*body { font: 12px/1.5 \5FAE\8F6F\96C5\9ED1, \5B8B\4F53, "Hiragino Sans GB", STHeiti, "WenQuanYi Micro Hei", "Droid Sans Fallback", SimSun, sans-serif; background: #fff; }*/
a { text-decoration: none; }
a:hover { text-decoration: underline; }
html {
  background: #F9FAFC;
}
.o2host_ctn {
  width: 1200px;
  margin: 0 auto;
}
.el-loading-mask {
  z-index: 1000;
}
</style>
