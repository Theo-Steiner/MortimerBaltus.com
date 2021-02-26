<script>
	import CornerMouseScroller from "./UX/CornerMouseScroller.svelte";
	import ScrollSlowDown from "./UX/ScrollSlowDown.svelte";
	import HeroView from "./UI/HeroView.svelte";
	import AboutWindow from "./Windows/AboutWindow.svelte";
	import ProjectCorazon from "./Windows/ProjectCorazon.svelte";
	import ProjectRaceworx from "./Windows/ProjectRaceworx.svelte";
	import ProjectMueller from "./Windows/ProjectMueller.svelte";
	import CookieWindow from "./Windows/CookieWindow.svelte";
	import LegalWindow from "./windows/LegalWindow.svelte";
	import PrivacyWindow from "./Windows/PrivacyWindow.svelte";
	import ReferencesWindow from "./Windows/ReferencesWindow.svelte";
	import GermanyJPG from "./Windows/GermanyJPG.svelte";
	import JapanJPG from "./Windows/JapanJPG.svelte";
	import CleanCode from "./Windows/CleanCode.svelte";
	import Logopedia from "./Windows/Logopedia.svelte";
</script>

<ScrollSlowDown />

<main>
	<HeroView />
	<ProjectCorazon />
	<AboutWindow />
	<JapanJPG />
	<CookieWindow />
	<ProjectRaceworx />
	<LegalWindow />
	<PrivacyWindow />
	<CleanCode />
	<ProjectMueller />
	<GermanyJPG />
	<ReferencesWindow />
	<Logopedia />
</main>

<style>
	main {
		display: grid;
		width: 100%;
		height: 100%;
		grid-template-columns: repeat(200, 1fr);
		grid-template-rows: repeat(200, 1fr);
	}
</style>
