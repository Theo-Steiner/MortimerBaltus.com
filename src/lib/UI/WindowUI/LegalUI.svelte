<script>
	import { t } from 'svelte-intl-precompile';
</script>

<p>
	{$t('windows.legal.text')}
</p>

<style>
	p {
		white-space: pre-line;
		display: block;
		height: 133px;
		width: 266px;
		color: #fefefe;
		font-size: 21px;
		margin: 0px;
		line-height: 25.5px;
		letter-spacing: -0.28px;
		padding: 9px 0px 15px 9px;
	}

	p:lang(ja) {
		font-size: 18px;
		line-height: 145%;
	}
</style>
