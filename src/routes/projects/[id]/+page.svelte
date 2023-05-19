<script>
	import { Container } from 'postcss';

	export let data;

	const { project } = data;
</script>

<container class="flex h-screen">
	<div
		class="flex flex-col text-center h-fit mx-auto w-fit rounded-lg"
		style="background-color: hsla(0, 0%, 0%, 0.5)"
	>
		<h1 class="text-xl font-bold underline p-4">{project.name}</h1>
		<p class="text-lg px-2 pb-2">{project.description}</p>
		<a href="/projects" class="text-sm pb-4 hover:text-blue-700 hover:dark:text-yellow-400"
			>&#8592; back to all projects</a
		>
		<img src={project.img} alt={project.name} class="w-1/2 mx-auto absolute z-[-50] left-[24%]" />
	</div>
</container>
