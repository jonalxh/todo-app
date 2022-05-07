<template>
	<b-card title="Todos" class="main-card">
		<b-input-group class="mt-3">
			<template #prepend>
				<b-input-group-text>
					<b-checkbox></b-checkbox>
				</b-input-group-text>
			</template>
			<b-input placeholder="Type a new task title here" v-model="newTask" @keyup.enter="createTask" autofocus></b-input>
		</b-input-group>

		<div class="pt-3">
			<Tasks :todos="todos" class="mb-3"></Tasks>

			<Nuxt />
		</div>

		<template #footer>
			<div class="d-flex justify-content-between">
				<div>0 items left</div>
				<div class="main-links">
					<b-link to="/">All</b-link>
					<b-link to="active">Active</b-link>
					<b-link to="completed">Completed</b-link>
				</div>
				<div>
					<b-link variant="link" class="text-secondary">Clear completed</b-link>
				</div>
			</div>
		</template>
	</b-card>
</template>

<script>
export default {
	name: "DefaultLayout",
	async fetch() {
		this.getTasks();
	},
	data() {
		return {
			newTask: null,
			todos: [],
		};
	},
	methods: {
		async getTasks() {
			this.todos = await this.$axios.$get("todos");
		},
		createTask() {
      this.$axios.post("todos", {
        title: this.newTask,
        completed: false
      }).then(res => {
        this.todos.push(res.data)
        this.newTask = null
      })
		},
	},
};
</script>
