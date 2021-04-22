<script>
	let languageSelected = 'english';

	function changeLanguage() {
		languageSelected = languageSelected === 'english' ? 'japanese' : 'english';
	}
</script>

<div class="container" on:click={changeLanguage}>
	<div class="animation-wrap">
		<div
			class:layer1-japanese={languageSelected === 'japanese'}
			class:layer1-english={languageSelected === 'english'}
			class="animate"
		>
			{languageSelected === 'japanese' ? 'あ' : 'A'}
		</div>
		<div
			class:layer2-japanese={languageSelected === 'japanese'}
			class:layer2-english={languageSelected === 'english'}
			class="animate"
		>
			{languageSelected === 'japanese' ? 'A' : 'あ'}
		</div>
		<div
			class:layer3-japanese={languageSelected === 'japanese'}
			class:layer3-english={languageSelected === 'english'}
			class="animate"
		>
			{languageSelected === 'japanese' ? 'あ' : 'A'}
		</div>
		<div
			class:layerX-japanese={languageSelected === 'japanese'}
			class:layerX-english={languageSelected === 'english'}
			class="animate"
		>
			{languageSelected === 'japanese' ? 'A' : 'あ'}
		</div>
		<div
			class:layer4-japanese={languageSelected === 'japanese'}
			class:layer4-english={languageSelected === 'english'}
			class="animate"
		>
			{languageSelected === 'japanese' ? 'あ' : 'A'}
		</div>
		<div
			class:layer5-japanese={languageSelected === 'japanese'}
			class:layer5-english={languageSelected === 'english'}
			class="animate"
		>
			{languageSelected === 'japanese' ? 'A' : 'あ'}
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		cursor: pointer;
	}

	.animation-wrap {
		width: 266px;
		height: 273px;
		transition: all 0.2s ease;
		background-color: rgb(201, 97, 97);
		color: #aa4545;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		font-size: 220px;
		line-height: 200px;
		font-weight: 400;
		font-family: sans-serif;
	}

	.animation-wrap:hover {
		background-color: #aa4545;
		color: rgb(201, 97, 97);
	}

	.animate {
		position: absolute;
		text-align: center;
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
