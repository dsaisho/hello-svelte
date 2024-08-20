
<script>
    import Globe from 'globe.gl';   
	import { onMount } from 'svelte';

  // Gen random data
  const N = 900;
  const gData = [...Array(N).keys()].map(() => ({ 
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: Math.random() / 3,
    color: ['red', 'white', 'blue', 'green','pink'][Math.round(Math.random() * 4)]
  }));

  onMount(()=>{

    Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .pointsData(gData)
      .pointAltitude('size')
      .pointColor('color')
      .width(650)
      .height(650)
    (document.getElementById('globeViz'))
  })

</script>

<div id="globeViz"></div>

<style>
  #globeViz {
    width: 650px;
    height: 650px;
  } 
  </style>