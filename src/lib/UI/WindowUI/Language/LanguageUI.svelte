<script>
	import LanguageLetter from './LanguageLetter.svelte';
	import { locale } from 'svelte-intl-precompile';
	const initialLanguage = $locale?.length === 2 ? $locale : $locale?.substring(0, 2);
	let languageSelected =
		initialLanguage === 'en' || initialLanguage === 'ja' ? initialLanguage : 'en';
	function changeLanguage() {
		languageSelected = languageSelected === 'en' ? 'ja' : 'en';
		locale.set(languageSelected);
	}
</script>

<div class="container" on:click={changeLanguage}>
	<div class="animation-wrap">
		<figure
			class:layer1-japanese={languageSelected === 'ja'}
			class:layer1-english={languageSelected === 'en'}
			class="animate"
			lang={languageSelected === 'ja' ? 'ja' : 'en'}
		>
			<LanguageLetter {languageSelected} />
		</figure>
		<figure
			class:layer2-japanese={languageSelected === 'ja'}
			class:layer2-english={languageSelected === 'en'}
			class="animate"
			lang={languageSelected === 'ja' ? 'en' : 'ja'}
		>
			<LanguageLetter {languageSelected} reverse={true} />
		</figure>
		<figure
			class:layer3-japanese={languageSelected === 'ja'}
			class:layer3-english={languageSelected === 'en'}
			class="animate"
			lang={languageSelected === 'ja' ? 'ja' : 'en'}
		>
			<LanguageLetter {languageSelected} />
		</figure>
		<figure
			class:layerX-japanese={languageSelected === 'ja'}
			class:layerX-english={languageSelected === 'en'}
			class="animate"
			lang={languageSelected === 'ja' ? 'en' : 'ja'}
		>
			<LanguageLetter {languageSelected} reverse={true} />
		</figure>
		<figure
			class:layer4-japanese={languageSelected === 'ja'}
			class:layer4-english={languageSelected === 'en'}
			class="animate"
			lang={languageSelected === 'ja' ? 'ja' : 'en'}
		>
			<LanguageLetter {languageSelected} />
		</figure>
		<figure
			class:layer5-japanese={languageSelected === 'ja'}
			class:layer5-english={languageSelected === 'en'}
			class="animate"
			lang={languageSelected === 'ja' ? 'en' : 'ja'}
		>
			<LanguageLetter {languageSelected} reverse={true} />
		</figure>
	</div>
</div>

<style>
	.container {
		overflow: hidden;
		cursor: pointer;
		width: 264px;
		height: 236px;
		transform: translateZ(0px) scale(1);
	}
	.animation-wrap {
		width: 100%;
		height: 100%;
		transition: all 0.2s ease;
		background-color: #151515;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	figure {
		background-color: #151515;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.animate {
		position: absolute;
		animation-fill-mode: forwards;
		animation-duration: 3s;
		animation-iteration-count: 1;
		animation-timing-function: cubic-bezier(0.83, 0, 0.17, 1);
		transform: translate(0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
	}
	.layer1-english {
		animation-name: layer1-english;
	}
	.layer2-english {
		animation-name: layer2-english;
	}
	.layer3-english {
		animation-name: layer3-english;
	}
	.layer4-english {
		animation-name: layer4-english;
	}
	.layer5-english {
		animation-name: layer5-english;
	}
	.layerX-english {
		animation-name: layerX-english;
	}
	@keyframes layer1-english {
		0% {
			transform: translate(0px, 0px) rotateX(0deg) rotateZ(0deg);
		}
		20% {
			transform: translate(0px, 133px) rotateX(-90deg) rotateZ(-90deg);
		}
		100% {
			transform: translate(0px, 133px) rotateX(-90deg) rotateZ(-90deg);
		}
	}
	@keyframes layer2-english {
		0% {
			transform: translate(0px, -133px) rotateX(90deg) rotateZ(-180deg);
		}
		20% {
			transform: translate(0px, 0px) rotateX(0deg) rotateZ(0deg);
		}
		40% {
			transform: translate(-133px, 0px) rotateY(-90deg) rotateZ(-180deg);
		}
		100% {
			transform: translate(-133px, 0px) rotateY(-90deg) rotateZ(-180deg);
		}
	}
	@keyframes layer3-english {
		0% {
			transform: translate(133px, 0px) rotateX(-90deg) rotateY(-90deg) rotateZ(0deg);
		}
		20% {
			transform: translate(133px, 0px) rotateX(-90deg) rotateY(-90deg) rotateZ(0deg);
		}
		40% {
			transform: translate(0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
		}
		60% {
			transform: translate(0px, -133px) rotateX(90deg) rotateY(0deg) rotateZ(-90deg);
		}
		100% {
			transform: translate(0px, -133px) rotateX(90deg) rotateY(0deg) rotateZ(-90deg);
		}
	}
	@keyframes layerX-english {
		0% {
			transform: translate(0px, 133px) rotateX(-90deg) rotateZ(180deg);
		}
		40% {
			transform: translate(0px, 133px) rotateX(-90deg) rotateZ(180deg);
		}
		60% {
			transform: translate(0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
		}
		80% {
			transform: translate(133px, 0px) rotateX(0deg) rotateY(90deg) rotateZ(180deg);
		}
		100% {
			transform: translate(133px, 0px) rotateX(0deg) rotateY(90deg) rotateZ(180deg);
		}
	}
	@keyframes layer4-english {
		0% {
			transform: translate(-133px, 0px) rotateY(90deg) rotateZ(-90deg);
		}
		60% {
			transform: translate(-133px, 0px) rotateY(90deg) rotateZ(-90deg);
		}
		80% {
			transform: translate(0px, 0px) rotateX(0deg) rotateZ(0deg);
		}
		100% {
			transform: translate(0px, 133px) rotateX(-90deg) rotateZ(-90deg);
		}
	}
	@keyframes layer5-english {
		0% {
			transform: translate(0px, -133px) rotateX(90deg) rotateZ(-180deg);
		}
		80% {
			transform: translate(0px, -133px) rotateX(90deg) rotateZ(-180deg);
		}
		100% {
			transform: translate(0px, 0px) rotateX(0deg) rotateZ(0deg);
		}
	}
	.layer1-japanese {
		animation-name: layer1-japanese;
	}
	.layer2-japanese {
		animation-name: layer2-japanese;
	}
	.layer3-japanese {
		animation-name: layer3-japanese;
	}
	.layer4-japanese {
		animation-name: layer4-japanese;
	}
	.layer5-japanese {
		animation-name: layer5-japanese;
	}
	.layerX-japanese {
		animation-name: layerX-japanese;
	}
	@keyframes layer1-japanese {
		0% {
			transform: translate(0px, 0px) rotateX(0deg) rotateZ(0deg);
		}
		20% {
			transform: translate(0px, 133px) rotateX(-90deg) rotateZ(-90deg);
		}
		100% {
			transform: translate(0px, 133px) rotateX(-90deg) rotateZ(-90deg);
		}
	}
	@keyframes layer2-japanese {
		0% {
			transform: translate(0px, -133px) rotateX(90deg) rotateZ(-180deg);
		}
		20% {
			transform: translate(0px, 0px) rotateX(0deg) rotateZ(0deg);
		}
		40% {
			transform: translate(-133px, 0px) rotateY(-90deg) rotateZ(-180deg);
		}
		100% {
			transform: translate(-133px, 0px) rotateY(-90deg) rotateZ(-180deg);
		}
	}
	@keyframes layer3-japanese {
		0% {
			transform: translate(133px, 0px) rotateX(-90deg) rotateY(-90deg) rotateZ(0deg);
		}
		20% {
			transform: translate(133px, 0px) rotateX(-90deg) rotateY(-90deg) rotateZ(0deg);
		}
		40% {
			transform: translate(0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
		}
		60% {
			transform: translate(0px, -133px) rotateX(90deg) rotateY(0deg) rotateZ(-90deg);
		}
		100% {
			transform: translate(0px, -133px) rotateX(90deg) rotateY(0deg) rotateZ(-90deg);
		}
	}
	@keyframes layerX-japanese {
		0% {
			transform: translate(0px, 133px) rotateX(-90deg) rotateZ(180deg);
		}
		40% {
			transform: translate(0px, 133px) rotateX(-90deg) rotateZ(180deg);
		}
		60% {
			transform: translate(0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
		}
		80% {
			transform: translate(133px, 0px) rotateX(0deg) rotateY(90deg) rotateZ(180deg);
		}
		100% {
			transform: translate(133px, 0px) rotateX(0deg) rotateY(90deg) rotateZ(180deg);
		}
	}
	@keyframes layer4-japanese {
		0% {
			transform: translate(-133px, 0px) rotateY(90deg) rotateZ(-90deg);
		}
		60% {
			transform: translate(-133px, 0px) rotateY(90deg) rotateZ(-90deg);
		}
		80% {
			transform: translate(0px, 0px) rotateX(0deg) rotateZ(0deg);
		}
		100% {
			transform: translate(0px, 133px) rotateX(-90deg) rotateZ(-90deg);
		}
	}
	@keyframes layer5-japanese {
		0% {
			transform: translate(0px, -133px) rotateX(90deg) rotateZ(-180deg);
		}
		80% {
			transform: translate(0px, -133px) rotateX(90deg) rotateZ(-180deg);
		}
		100% {
			transform: translate(0px, 0px) rotateX(0deg) rotateZ(0deg);
		}
	}
</style>
