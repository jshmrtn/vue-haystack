import{_ as o,r as a,o as c,a as l,d as t,b as n,F as u,e as s,c as i}from"./app.63757f2b.js";const r={},k=n("h1",{id:"snackbar",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#snackbar","aria-hidden":"true"},"#"),s(" Snackbar")],-1),d=i(`<p>The snackbar store will display your own components as &quot;snacks&quot;/&quot;toasts&quot;.</p><h2 id="modal-container" tabindex="-1"><a class="header-anchor" href="#modal-container" aria-hidden="true">#</a> Modal container</h2><p>Import and add the <code>SnackContainer</code> in your <code>App.vue</code>:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> SnackContainer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue-haystack&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SnackContainer</span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="snack" tabindex="-1"><a class="header-anchor" href="#snack" aria-hidden="true">#</a> Snack</h2><h3 id="creating-a-snack" tabindex="-1"><a class="header-anchor" href="#creating-a-snack" aria-hidden="true">#</a> Creating a snack</h3><p>You will need to write your own snack components, as a very simple example (<code>MySnack.vue</code>):</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">padding</span><span class="token punctuation">:</span> 2rem<span class="token punctuation">;</span> <span class="token property">background-color</span><span class="token punctuation">:</span> white</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>My snack content<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>From withing a snack, you can call <code>useSnack()</code> that provides a <code>close</code> function. This also allows you to pass data if needed.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useSnack <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue-haystack&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> snack <span class="token operator">=</span> <span class="token function">useSnack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
snack<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// with data</span>
snack<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">{</span> foo<span class="token operator">:</span> <span class="token string">&quot;bar&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// you can explicitely type the data (this does not affect \`onClose\` unfortunately)</span>
snack<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">close</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token punctuation">{</span> foo<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">}</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> foo<span class="token operator">:</span> <span class="token string">&quot;bar&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>A snack also has a <code>timer</code> property that allows reading and manipulating the lifetime of the snack.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">const</span> snack <span class="token operator">=</span> <span class="token function">useSnack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// remaining time</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>snack<span class="token punctuation">.</span>timer<span class="token punctuation">.</span>remainingTime<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// lifetime value between 1 and 0, you can use this to show a progress bar or something similar</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>snack<span class="token punctuation">.</span>timer<span class="token punctuation">.</span>progress<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// absolute lifetime</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>snack<span class="token punctuation">.</span>timer<span class="token punctuation">.</span>duration<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// pause timer</span>
snack<span class="token punctuation">.</span>timer<span class="token punctuation">.</span><span class="token function">pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// resume timer</span>
snack<span class="token punctuation">.</span>timer<span class="token punctuation">.</span><span class="token function">resume</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// stop/reset the timer</span>
snack<span class="token punctuation">.</span>timer<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="showing-a-snack" tabindex="-1"><a class="header-anchor" href="#showing-a-snack" aria-hidden="true">#</a> Showing a snack</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useSnackbar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue-haystack&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> MySnack <span class="token keyword">from</span> <span class="token string">&quot;./MySnack.vue&quot;</span><span class="token punctuation">;</span>

<span class="token function">useSnackbar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>MySnack<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><code>push</code> allows you to pass props, event listeners and modal options.</p><p>A snack receives a <code>time</code> option in milliseconds. It will be closed automatically after the specified time.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token function">useSnackbar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>
  MySnack<span class="token punctuation">,</span>
  <span class="token punctuation">{</span> foo<span class="token operator">:</span> <span class="token string">&quot;bar&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// props</span>
  <span class="token punctuation">{</span> <span class="token function-variable function">log</span><span class="token operator">:</span> <span class="token punctuation">(</span>text<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// listeners</span>
  <span class="token punctuation">{</span> time<span class="token operator">:</span> <span class="token number">2000</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// options</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><code>push</code> also returns an object with an <code>onClose</code> function to react to close events. If using typescript, set the generic type <code>onClose</code> so the <code>data</code> parameter is properly typed.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token function">useSnackbar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>MySnack<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token generic-function"><span class="token function">onClose</span><span class="token generic class-name"><span class="token operator">&lt;</span>MyDataType<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// data will be undefined if the modal is closed without data, e.g. when it is closed by clicking the overlay</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="customization" tabindex="-1"><a class="header-anchor" href="#customization" aria-hidden="true">#</a> Customization</h2><p>By default, the container uses flexbox to display snacks in the top right corner. You can override the styles of the container if you want to display them centered, for example:</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SnackContainer</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>You can also customize the component rendering of each snack in the <code>SnackContainer</code>.</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SnackContainer</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#default</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{snack, activeModal}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span>
      <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>snack.component<span class="token punctuation">&quot;</span></span>
      <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>snack.id<span class="token punctuation">&quot;</span></span>
      <span class="token attr-name">v-bind</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>snack.props<span class="token punctuation">&quot;</span></span>
      <span class="token attr-name">v-on</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>snack.listeners<span class="token punctuation">&quot;</span></span>
    <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>SnackContainer</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div>`,25),m=s("If you need more control (e.g. custom animations), you can implement your own "),b=n("code",null,"SnackContainer",-1),g=s(". The default component is relatively simple and can be used as "),h={href:"https://github.com/jshmrtn/vue-haystack/blob/master/src/snackbar/SnackContainer.vue",target:"_blank",rel:"noopener noreferrer"},v=s("template"),y=s(".");function f(q,w){const p=a("SnackbarDemo"),e=a("ExternalLinkIcon");return c(),l(u,null,[k,t(p,{style:{margin:"2rem 0 2rem 0"}}),d,n("p",null,[m,b,g,n("a",h,[v,t(e)]),y])],64)}var x=o(r,[["render",f]]);export{x as default};