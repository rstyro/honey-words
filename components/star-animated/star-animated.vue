<template>
	<view>
		<view class="icon-box">
			<view class="icon-background">
				<view class="icon-location" @click="toggle" :class="AnimateClass">
					<slot name="icon" ></slot>
				</view>
				<view class="icon-decoration" :class="{ 'icon-decoration-active':toggleAnimate}"></view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
	  name: 'VueStar',
	  props: {
	    animate: String,
		active: Boolean
	  },
	  methods: {
	    toggle () {
			console.log("ACTIVE=",this.active);
			this.toggleAnimate = !this.active;
	    }
	  },
	  data () {
	    return {
	      toggleAnimate: false
	    }
	  },
	  computed: {
	    AnimateClass () {
	      return this.toggleAnimate ? this.animate : ''
	    }
	  }
	}
</script>

<style>
	.icon-box{
		/* position: absolute; */

	}
	.icon-background {
		width: 100px;
		height: 100px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-location {
		z-index: 888;
	}

	.icon-decoration {
		width: 100px;
		height: 100px;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		background: url(../../static/img/cover.png) ;
		background-position: 0 0;
		transition: background-position 0.8s steps(17);
		transition-duration: 0s;
	}
	.icon-decoration-active{
		transition-duration: 0.8s;
		background-position: -1700px 0px;
	}
			
</style>
