<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Render the reviewed AI-generated transparent mascot GIF only in the hero; retain the supplied original PNG before hydration and for reduced-motion users to preserve a static fallback.
- Integrate the hero mascot using a dedicated stage with derived silhouette/contact shadows and CSS light spill; keep the original asset untouched so environmental effects never redraw the character.
- Use one-time IntersectionObserver section reveals and CSS animations for interactive effects and mascot movement; keep pre-hydration content visible and respect reduced-motion preferences.
