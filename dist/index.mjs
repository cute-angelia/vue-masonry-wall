import { defineComponent as M, toRefs as W, ref as _, onMounted as $, onBeforeUnmount as D, watch as B, openBlock as d, createElementBlock as f, normalizeStyle as R, unref as v, Fragment as T, renderList as S, renderSlot as E, createTextVNode as Y, toDisplayString as z, nextTick as A } from "vue";
const F = ["data-index", "data-column"], L = /* @__PURE__ */ M({
  __name: "masonry-wall",
  props: {
    columnWidth: { default: 400 },
    items: null,
    gap: { default: 0 },
    rtl: { type: Boolean, default: !1 },
    ssrColumns: { default: 0 },
    scrollContainer: { default: null }
  },
  emits: ["redraw", "redrawSkip"],
  setup(o, { emit: m }) {
    const b = o, { columnWidth: g, items: s, gap: r, rtl: h, ssrColumns: w, scrollContainer: y } = W(b), u = _([]), c = _();
    function x() {
      const e = Math.floor(
        (c.value.getBoundingClientRect().width + r.value) / (g.value + r.value)
      );
      return e > 0 ? e : 1;
    }
    function C(e) {
      return [...new Array(e)].map(() => []);
    }
    if (w.value > 0) {
      const e = C(w.value);
      s.value.forEach(
        (l, t) => e[t % w.value].push(t)
      ), u.value = e;
    }
    async function k(e) {
      if (e >= s.value.length)
        return;
      await A();
      const l = [...c.value.children];
      h.value && l.reverse();
      const t = l.reduce(
        (i, n) => n.getBoundingClientRect().height < i.getBoundingClientRect().height ? n : i
      );
      u.value[+t.dataset.index].push(e), await k(e + 1);
    }
    async function p(e = !1) {
      if (u.value.length === x() && !e) {
        m("redrawSkip");
        return;
      }
      u.value = C(x());
      const l = y == null ? void 0 : y.value, t = l ? l.scrollTop : window.scrollY;
      await k(0), l ? l.scrollBy({ top: t - l.scrollTop }) : window.scrollTo({ top: t }), m("redraw");
    }
    const a = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(() => p());
    return $(() => {
      p(), a == null || a.observe(c.value);
    }), D(() => a == null ? void 0 : a.unobserve(c.value)), B([s, h], () => p(!0)), B([g, r], () => p()), (e, l) => (d(), f("div", {
      ref_key: "wall",
      ref: c,
      class: "masonry-wall",
      style: R({ display: "flex", gap: `${v(r)}px` })
    }, [
      (d(!0), f(T, null, S(u.value, (t, i) => (d(), f("div", {
        key: i,
        class: "masonry-column",
        "data-index": i,
        "data-column": t[0],
        style: R({
          display: "flex",
          "flex-basis": "0px",
          "flex-direction": "column",
          "flex-grow": 1,
          gap: `${v(r)}px`,
          height: ["-webkit-max-content", "-moz-max-content", "max-content"],
          "min-width": 0
        })
      }, [
        (d(!0), f(T, null, S(t, (n) => (d(), f("div", {
          key: n,
          class: "masonry-itemx"
        }, [
          E(e.$slots, "default", {
            item: v(s)[n],
            index: n
          }, () => [
            Y(z(v(s)[n]), 1)
          ])
        ]))), 128))
      ], 12, F))), 128))
    ], 4));
  }
}), U = /* @__PURE__ */ (() => {
  const o = L;
  return o.install = (m) => {
    m.component("MasonryWall", o);
  }, o;
})();
export {
  U as default
};
