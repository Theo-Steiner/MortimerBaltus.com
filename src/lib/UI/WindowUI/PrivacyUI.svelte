<script>
	import { t } from 'svelte-intl-precompile';
</script>

<p>
	{$t('windows.privacy.text')}
</p>

<style>
	p {
		color: #151515;
		font-size: 24px;
		white-space: pre-line;
		margin: 0px;
		padding: 10px 8px 11px 10px;
		line-height: 25.5px;
		letter-spacing: -0.28px;
	}

	p:lang(ja) {
		font-size: 20px;
		line-height: 145%;
	}
</style>
