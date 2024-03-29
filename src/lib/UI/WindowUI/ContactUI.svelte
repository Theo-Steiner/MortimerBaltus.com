<script>
	import { t } from 'svelte-intl-precompile';
	import { horizontalSlide } from '$lib/UX/css_utils';
	import { scale } from 'svelte/transition';

	let view = 'overview';
	let messageCounter = 0;

	let userEmail = '';
	let userBody = '';
	let emailTouched = false;

	let success = false;
	let isLoading = false;

	$: isEmailValid = isValidEmail(userEmail) && !isEmpty(userEmail);
	$: isBodyValid = !isEmpty(userBody);
	$: isFormValid = isEmailValid && isBodyValid;

	$: disabled = !isFormValid;

	function isEmpty(body) {
		return body.trim().length === 0;
	}

	function isValidEmail(email) {
		return new RegExp(
			"[a-z0-9!#$%&' * +/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
		).test(email);
	}

	function resetEmail() {
		userEmail = '';
		userBody = '';
		emailTouched = false;
	}

	const moritzmoji =
		'https://res.cloudinary.com/thdrstnr/image/upload/w_108,q_auto:best/v1630485048/MortimerBaltus/misc/moritzmemoji_cjyrwj';
	const theomoji =
		'https://res.cloudinary.com/thdrstnr/image/upload/w_108,q_auto:best/v1630485048/MortimerBaltus/misc/theomemoji_ipo7or';

	function resetView() {
		setTimeout(() => {
			view = 'overview';
		}, 5000);
	}

	let messageTimer;

	function startMessageTimer() {
		clearTimeout(messageTimer);
		messageTimer = setTimeout(() => {
			messageCounter++;
		}, 1500);
	}

	function resetChatView() {
		clearTimeout(messageTimer);
		view = view === 'moritz' || view === 'theo' ? 'overview' : view;
		messageCounter = 0;
	}

	function submitForm() {
		isLoading = true;
		fetch('https://mail-handler.theosteiner.workers.dev', {
			method: 'POST',
			body: JSON.stringify({
				userEmail: userEmail,
				recipient: view.substring(7),
				message: userBody
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error('Failed to send email');
				}
				success = true;
				isLoading = false;
				resetEmail();
				view = view.substring(7);
			})
			.catch((err) => {
				console.log(err);
				success = false;
				isLoading = false;
				view = view.substring(7);
			});
	}
</script>

<div class="container" class:inverse-slide={view === 'overview'}>
	{#if view === 'overview'}
		<div class="contact-container" transition:horizontalSlide|local>
			<div class="fixed">
				<h1 lang="en">
					GET IN <br />TOUCH
				</h1>
				<hr />
				<button
					class="contact"
					on:click={() => {
						view = 'moritz';
					}}
				>
					<img src={moritzmoji} alt="Moritz Mortimer Müller as a Memoji" draggable="false" />
					<p>{$t(`windows.contact.moritz.name`)}</p>
				</button>
				<hr />
				<button
					class="contact"
					on:click={() => {
						view = 'theo';
					}}
				>
					<img src={theomoji} alt="Theodor Baltus Steiner as a Memoji" draggable="false" />
					<p>{$t(`windows.contact.theo.name`)}</p>
				</button>
			</div>
		</div>
	{:else if view === 'theo' || view === 'moritz'}
		<div class="message-container" transition:horizontalSlide>
			<div class="fixed">
				<div class="message" style="height: 54px;">
					<img
						src={view === 'moritz' ? moritzmoji : theomoji}
						alt={view === 'moritz'
							? 'Moritz Mortimer Müller as a Memoji'
							: 'Theodor Baltus Steiner as a Memoji'}
						class="message-img"
						draggable="false"
						class:hidden={messageCounter != 0}
						on:click={() => {
							resetChatView();
						}}
					/>
					<p style="height: 38px;" transition:scale class="message-bubble" use:startMessageTimer>
						{$t(`windows.contact.${view}.greeting`)}
					</p>
				</div>
				<div class="message long-message" style="height: 95px;">
					{#if messageCounter > 0}
						<img
							src={view === 'moritz' ? moritzmoji : theomoji}
							alt={view === 'moritz'
								? 'Moritz Mortimer Müller as a Memoji'
								: 'Theodor Baltus Steiner as a Memoji'}
							class="message-img"
							class:hidden={messageCounter != 1}
							draggable="false"
							on:click={() => {
								resetChatView();
							}}
						/>
						<p style="height: 95px;" transition:scale class="message-bubble" use:startMessageTimer>
							{$t(`windows.contact.${view}.info`)}
						</p>
					{/if}
				</div>
				<div class="message" style="height: 54px;">
					{#if messageCounter > 1}
						<img
							src={view === 'moritz' ? moritzmoji : theomoji}
							alt={view === 'moritz'
								? 'Moritz Mortimer Müller as a Memoji'
								: 'Theodor Baltus Steiner as a Memoji'}
							class="message-img"
							draggable="false"
							on:click={() => {
								resetChatView();
							}}
						/>
						<p style="height: 38px;" transition:scale class="message-bubble">
							{$t(`windows.contact.${view}.cta`)}
						</p>
					{/if}
				</div>
				<div class="button-container">
					<button
						class="cancel-button"
						on:click={() => {
							resetChatView();
						}}
					>
						<svg version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<title>Group 2</title>
							<g fill="none" fill-rule="evenodd">
								<g transform="translate(1 1)" stroke="#fff">
									<line x2="22" y2="22" />
									<line
										transform="translate(11 11) scale(-1 1) translate(-11 -11)"
										x2="22"
										y2="22"
									/>
								</g>
							</g>
						</svg></button
					>
					<button
						class="action-button"
						on:click={() => {
							view = `mailto:${
								view === 'moritz' ? 'moritz@mortimerbaltus.com' : 'theo@mortimerbaltus.com'
							}`;
							resetChatView();
						}}>{$t(`windows.contact.compose`)}</button
					>
				</div>
			</div>
		</div>
	{:else if view.includes('mailto:')}
		<div class="email-container" transition:horizontalSlide>
			<form on:submit|preventDefault method="POST" class="fixed">
				<input
					type="text"
					name="email"
					class="user-email"
					placeholder={emailTouched && !isEmailValid
						? 'Please enter a valid Email address'
						: 'Your Email'}
					class:invalid-email={emailTouched && !isEmailValid}
					bind:value={userEmail}
					on:blur={() => (emailTouched = true)}
					on:focus={() => (emailTouched = false)}
				/>
				<textarea
					cols="30"
					rows="10"
					class="user-body"
					name="message"
					placeholder="Your Message"
					bind:value={userBody}
				/>
				<div class="button-container">
					<button
						class="cancel-button"
						on:click={() => {
							if (!isEmpty(userEmail) && !isEmpty(userBody)) {
								if (confirm('Do you really want to discard your Message?')) {
									view = 'overview';
									resetEmail();
								}
							} else {
								view = 'overview';
								resetEmail();
							}
						}}
					>
						<svg version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<title>Group 2</title>
							<g fill="none" fill-rule="evenodd">
								<g transform="translate(1 1)" stroke="#fff">
									<line x2="22" y2="22" />
									<line
										transform="translate(11 11) scale(-1 1) translate(-11 -11)"
										x2="22"
										y2="22"
									/>
								</g>
							</g>
						</svg></button
					>
					<button
						class="action-button"
						type="submit"
						class:disabled={!isFormValid}
						{disabled}
						on:click={submitForm}>{$t(`windows.contact.${!isLoading ? 'send' : 'sending'}`)}</button
					>
				</div>
			</form>
		</div>
	{:else}
		<div class="message-container" transition:horizontalSlide use:resetView>
			<div class="fixed">
				<div class="message">
					<img
						src={view === 'moritz@mortimerbaltus.com' ? moritzmoji : theomoji}
						alt={view === 'moritz@mortimerbaltus.com'
							? 'Moritz Mortimer Müller as a Memoji'
							: 'Theodor Baltus Steiner as a Memoji'}
						class="message-img"
						draggable="false"
						on:click={() => {
							view = 'overview';
						}}
					/>
					<p transition:scale class="message-bubble">
						{$t(`windows.contact.${success ? 'success' : 'error'}`)}
					</p>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	form {
		height: 279px;
	}

	input {
		font-size: 16px;
		width: 376px;
		height: 41px;
		padding-left: 24px;
		padding-top: 12px;
		padding-bottom: 14px;
		background-color: #ffffff;
		color: #5a8bf3;
		border: 1px solid #efefef;
		border-top: none;
	}

	input:focus {
		border-bottom: 1px solid #cddcfb;
		outline: none;
	}

	input::placeholder {
		color: #cddcfb;
	}

	.invalid-email {
		color: #f35a5a;
		border-bottom: 1px solid #f35a5a;
	}

	.invalid-email::placeholder {
		color: #f35a5a;
	}

	textarea {
		font-size: 16px;
		height: 100%;
		width: 100%;
		padding: 18px;
		padding-left: 24px;
		color: #151515;
		background-color: #efefef;
		border: none;
	}

	textarea::placeholder {
		color: #acacac;
	}

	textarea:focus {
		outline: none;
	}

	.container {
		height: 279px;
		width: 752px;
		display: flex;
		overflow: hidden;
	}

	.message-container,
	.email-container,
	.contact-container {
		overflow: hidden;
	}

	.inverse-slide {
		position: relative;
		left: -376px;
		flex-direction: row-reverse;
	}

	.email-container {
		height: 279px;
		width: 376px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.fixed {
		height: 279px;
		width: 376px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.button-container {
		width: 100%;
		height: 54px;
		display: flex;
	}

	.action-button {
		height: 54px;
		width: 322px;
		border: none;
		border-top: 1px solid #ffffff;
		background-color: #c7c7c7;
		font-size: 20px;
		color: #151515;
	}

	.action-button:lang(ja) {
		font-size: 16px;
	}

	.cancel-button {
		height: 54px;
		width: 54px;
		border: none;
		border-top: 1px solid #ffffff;
		border-right: 1px solid #ffffff;
		background-color: #c7c7c7;
		font-size: 20px;
	}

	.disabled {
		color: #909090;
	}

	line {
		transition: stroke;
	}

	.cancel-button svg {
		height: 22px;
		width: 22px;
		margin: 16px;
	}

	.hidden {
		visibility: hidden;
	}

	.message-bubble {
		user-select: text;
		color: #ffffff;
		background-color: #5a8bf3;
		border-radius: 20px;
		margin-left: 10px;
		font-size: 16px;
		line-height: 19.5px;
		overflow: hidden;
	}

	.message-bubble:lang(ja) {
		font-size: 14px;
		line-height: 145%;
	}

	.message-container {
		height: 279px;
		width: 376px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		padding-top: 4px;
	}

	.message {
		padding-left: 10px;
		padding-right: 40px;
		display: flex;
		align-items: center;
	}

	.long-message {
		height: 95px;
		align-items: flex-end;
		overflow: hidden;
	}

	.contact-container {
		height: 279px;
		width: 376px;
		padding: 2px;
	}

	.contact {
		width: 376px;
		height: 76px;
		padding-left: 10px;
		display: flex;
		align-items: center;
		border: none;
		background-color: #efefef;
	}

	button {
		user-select: none;
	}

	button:focus {
		outline: none;
	}

	button:active {
		background-color: #efefef;
	}

	img {
		border-radius: 50%;
		padding: 0;
		margin: 0;
		height: 54px;
		width: 54px;
	}

	h1 {
		font-size: 54px;
		line-height: 0.97;
		letter-spacing: 0.45px;
		user-select: none;
		color: #151515;
		padding: 10px 0 4px 14px;
	}

	p {
		color: #151515;
		font-size: 20px;
		margin: 0px;
		padding: 10px;
	}

	p:lang(ja) {
		font-size: 16px;
	}

	hr {
		color: #c7c7c7;
		background-color: #c7c7c7;
	}

	@media (hover: hover) {
		.cancel-button:hover svg line {
			stroke: #151515;
		}

		button:hover {
			background-color: #efefef;
		}

		.contact:hover {
			background-color: #ffffff;
		}
	}
</style>
