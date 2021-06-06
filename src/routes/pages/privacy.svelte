<script>
	import { slide } from 'svelte/transition';
	let gdpr = false;
	let logFiles = false;
	let dataCollected = false;
	let privacyPolicy = false;
	let cloudflare = false;
	let microsoft = false;
	let children = false;
	let onlineOnly = false;
	let consent = false;

	function handleSectionClick(toggleFunction) {
		var selectedText = window.getSelection().toString();
		if (selectedText === '') {
			toggleFunction();
		}
	}
</script>

<svelte:head>
	<title>Privacy Policy</title>
	<meta name="description" content="The Privacy Statement of MortimerBaltus.com" />
</svelte:head>

<div class="container">
	<p class="intro">
		At MortimerBaltus, accessible from MortimerBaltus.com, one of our main priorities is the privacy
		of our visitors. This Privacy Policy document contains types of information that is collected
		and recorded by MortimerBaltus and how we use it.
	</p>

	<hr />
	<section on:click={handleSectionClick(() => (gdpr = !gdpr))} class:open={gdpr}>
		<h2>General Data Protection Regulation (GDPR)</h2>
		{#if gdpr}
			<div class="slider" transition:slide>
				<p>
					We are a Data Controller of your information. MortimerBaltus legal basis for collecting
					and using the personal information described in this Privacy Policy depends on the
					Personal Information we collect and the specific context in which we collect the
					information:
				</p>
				<br />
				<ol>
					<li>MortimerBaltus needs to perform a contract with you</li>
					<li>You have given MortimerBaltus permission to do so</li>
					<li>Processing your personal information is in MortimerBaltus legitimate interests</li>
					<li>MortimerBaltus needs to comply with the law</li>
					<li>
						MortimerBaltus will retain your personal information only for as long as is necessary
						for the purposes set out in this Privacy Policy. We will retain and use your information
						to the extent necessary to comply with our legal obligations, resolve disputes, and
						enforce our policies.
					</li>
				</ol>
				<br />
				<p>
					If you are a resident of the European Economic Area (EEA), you have certain data
					protection rights. If you wish to be informed what Personal Information we hold about you
					and if you want it to be removed from our systems, please contact us. <br /> <br />
					In certain circumstances, you have the following data protection rights:
				</p>
				<br />
				<ol>
					<li>The right to access, update or to delete the information we have on you.</li>
					<li>The right of rectification.</li>
					<li>The right to object.</li>
					<li>The right of restriction.</li>
					<li>The right to data portability</li>
					<li>The right to withdraw consent</li>
				</ol>
			</div>
		{/if}
	</section>
	<hr />
	<section on:click={handleSectionClick(() => (logFiles = !logFiles))} class:open={logFiles}>
		<h2>Log Files</h2>
		{#if logFiles}
			<p class="slider" transition:slide>
				MortimerBaltus follows a standard procedure of using log files. These files log visitors
				when they visit websites. All hosting companies do this and a part of hosting services'
				analytics. The information collected by log files include internet protocol (IP) addresses,
				browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages,
				and possibly the number of clicks. These are not linked to any information that is
				personally identifiable. The purpose of the information is for analyzing trends,
				administering the site, tracking users' movement on the website, and gathering demographic
				information.
			</p>
		{/if}
	</section>
	<hr />
	<section
		on:click={handleSectionClick(() => (dataCollected = !dataCollected))}
		class:open={dataCollected}
	>
		<h2>Data Collected</h2>
		{#if dataCollected}
			<div class="slider" transition:slide>
				<p>
					While using Our Service, We may ask You to provide Us with certain personally identifiable
					information that can be used to contact or identify You. Personally identifiable
					information may include, but is not limited to:
				</p>
				<br />
				<ol>
					<li>
						<p>Email address</p>
					</li>
					<li>
						<p>Usage Data</p>
					</li>
				</ol>
			</div>
		{/if}
	</section>
	<hr />
	<section
		on:click={handleSectionClick(() => (privacyPolicy = !privacyPolicy))}
		class:open={privacyPolicy}
	>
		<h2>Third Party Privacy Policies</h2>
		{#if privacyPolicy}
			<p class="slider" transition:slide>
				MortimerBaltus.com's Privacy Policy does not apply to other services or websites. Thus, we
				are advising you to consult the respective Privacy Policies of the third-party providers
				listed below for more detailed information. It may include their practices and instructions
				about how to opt-out of certain options. <br /> <br />
				You can choose to disable cookies through your individual browser options. To know more detailed
				information about cookie management with specific web browsers, it can be found at the browsers'
				respective websites.
			</p>
		{/if}
	</section>
	<hr />
	<section on:click={handleSectionClick(() => (cloudflare = !cloudflare))} class:open={cloudflare}>
		<h2>Cloudflare</h2>
		{#if cloudflare}
			<p class="slider" transition:slide>
				Cloudflare is the cloud service provider and content delivery network we use to host
				MortimerBaltus.com. <br />
				Legal basis for using Cloudflare on our website is the
				<a href="https://www.privacyshield.gov/participant?id=a2zt0000000GnZKAA0">
					privacy shield framework
				</a>. We may process your personal data until our legitimate interest ceases to exist.
				<br />
				Please visit Cloudflare’s
				<a href="https://www.cloudflare.com/security-policy/"> privacy and security policies </a> to
				learn more.
			</p>
		{/if}
	</section>
	<hr />
	<section on:click={handleSectionClick(() => (microsoft = !microsoft))} class:open={microsoft}>
		<h2>Microsoft</h2>
		{#if microsoft}
			<p class="slider" transition:slide>
				Microsoft is the API service provider we use to forward user messages sent to us through the
				contact form on MortimerBaltus.com. <br />
				Legal basis for using Microsoft's services on our website is the
				<a href="https://www.privacyshield.gov/participant?id=a2zt0000000KzNaAAK">
					privacy shield framework
				</a>. We may process your personal data until our legitimate interest ceases to exist.
				<br />
				Please visit Microsoft's
				<a href="https://privacy.microsoft.com/en-US/privacystatement"> privacy policy </a> to learn
				more.
			</p>
		{/if}
	</section>
	<hr />
	<section on:click={handleSectionClick(() => (children = !children))} class:open={children}>
		<h2>Children</h2>
		{#if children}
			<p class="slider" transition:slide>
				Another part of our priority is adding protection for children while using the internet. We
				encourage parents and guardians to observe, participate in, and/or monitor and guide their
				online activity. <br /><br /> MortimerBaltus.com does not knowingly collect any Personal Identifiable
				Information from children under the age of 13. If you think that your child provided this kind
				of information on our website, we strongly encourage you to contact us immediately and we will
				do our best efforts to promptly remove such information from our records.
			</p>
		{/if}
	</section>
	<hr />
	<section on:click={handleSectionClick(() => (onlineOnly = !onlineOnly))} class:open={onlineOnly}>
		<h2>Online Privacy Policy Only</h2>
		{#if onlineOnly}
			<p class="slider" transition:slide>
				Our Privacy Policy applies only to our online activities and is valid for visitors to our
				website with regards to the information that they shared and/or collect in
				MortimerBaltus.com. This policy is not applicable to any information collected offline or
				via channels other than this website.
			</p>
		{/if}
	</section>
	<hr />
	<section on:click={handleSectionClick(() => (consent = !consent))} class:open={consent}>
		<h2>Consent</h2>
		{#if consent}
			<p class="slider" transition:slide>
				By using our website, you hereby consent to our Privacy Policy and agree to its terms.
			</p>
		{/if}
	</section>
	<hr />
</div>

<style>
	:global(.privacy-subpage-color) {
		background-image: linear-gradient(#fec7a3, #151515);
	}

	.container {
		background: #fec7a3;
		min-height: calc(100vh - 331px);
	}

	section {
		transition: background-color 400ms ease;
		background-color: #fec7a3;
		font-size: 22px;
		line-height: 26px;
		letter-spacing: -0.55px;
	}

	@media (hover: hover) {
		section:hover,
		section:hover h2 {
			transition: all 400ms ease;
			background-color: #151515;
			color: #fefefe;
		}
	}

	.open,
	.open h2,
	.open p {
		background-color: #151515;
		color: #fefefe;
	}

	p {
		color: #fefefe;
		font-size: 22px;
		line-height: 26px;
		letter-spacing: -0.55px;
		padding: 5px 10px 20px 10px;
	}

	h2 {
		color: #151515;
		font-size: 24px;
		letter-spacing: -0.55px;
		padding: 15px 10px 15px 10px;
	}

	a,
	a:visited {
		color: #fefefe;
	}

	.slider {
		padding: 5px 10px 20px 10px;
	}

	ol {
		margin-left: 10px;
	}
	li {
		margin-left: 18px;
	}

	.intro {
		color: #151515;
		font-size: clamp(22px, 3.5vw, 44px);
		line-height: clamp(25px, 0.35vw, 50px);
		letter-spacing: -0.28px;
		line-height: 1;
		padding: 73px 10px 30px 10px;
	}

	@media only screen and (min-device-width: 768px) {
		.slider {
			padding: 0px 20px 50px 20px;
		}

		.intro {
			letter-spacing: -0.55px;
			padding: 83px 20px 30px 20px;
		}

		h2 {
			line-height: 52px;
			padding: 20px 20px 20px 20px;
		}
	}
</style>
