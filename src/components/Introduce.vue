<template>
  <div class="wrapper">
		<div class="header">
			<img :src="item.icons[item.icons.length - 1].url" alt="">
			<p>{{ item.name }}</p>
		</div>
		<div class="content">
			<dl>
				<dt>- 插件简介</dt>
				<dd>{{ item.description }}</dd>
				<dt>- 人员介绍</dt>
				<dd>
					<p><span>Developed By: </span><span>elegantYU</span></p>
					<p><span>Designed By: </span><span>夏英俊</span></p>
				</dd>
				<p class="feedback">
					反馈邮箱：elegantyu2019@gmail.com
				</p>
			</dl>
		</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getSelf } from '../services/management'

export default Vue.extend({
	data(): any {
		return  {
			item: {}
		}
	},
	mounted() {
		this.getDetail()
	},
	methods: {
		getDetail() {
			getSelf().then(data => {
				console.log("[myself]:", data)
				this.item = Object.assign({}, data)
			})
		},
	}
})
</script>

<style lang="scss" scoped>
.wrapper {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -40%);
	width: 340px;
	height: auto;
	padding: 15px 20px;
	background-color: var(--theme-background-default);
	border-radius: 5px;
	opacity: 0;
	animation: wholeSlideUp 0.1s ease-in 0.2s forwards;
	
	.header {
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		color: var(--theme-fontColor-default);
		font-size: 16px;
		transform: translateY(100%);
		opacity: 0;
		font-weight: bold;
		border-bottom: 1px dashed var(--theme-option-border);
		animation: slideUp 0.2s linear 0.3s forwards;
		&:hover {
			img {
				transform: rotate(360deg);
			}
		}

		img {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			margin-right: 10px;
			transition: all 0.4s ease;
		}
	}

	.content {
		padding: 10px 0;
		dl {
			dt {
				height: 32px;
				line-height: 32px;
				font-size: 14px;
				text-align: left;
				color: var(--theme-fontColor-sub);
				transform: translateY(100%);
				opacity: 0;
				animation: slideUp 0.2s linear 0.5s forwards;
			}
			dd {
				font-size: 14px;
				padding: 5px;
				line-height: 1.5;
				color: var(--theme-fontColor-sub);
				text-align: left;
				transform: translateY(100%);
				opacity: 0;
				animation: slideUp 0.2s linear 0.5s forwards;
				p {
					height: 24px;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					color: var(--theme-fontColor-sub);
					span {
						width: 100px;
						margin-right: 10px;
						text-align: left;
					}
				}
			}

			.feedback {
				color: var(--theme-fontColor-readOnly);
				font-size: 12px;
				text-align: center;
				margin-top: 10px;
			}
		}
	}
}

@keyframes wholeSlideUp {
	form {
		transform: translate(-50%, -40%);
		opacity: 0;
	}
	to {
		transform: translate(-50%, -50%);
		opacity: 1;
	}
}
@keyframes slideUp {
	form {
		transform: translateY(100%);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
}
</style>
