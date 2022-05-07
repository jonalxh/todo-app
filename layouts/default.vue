<template>
	<b-card title="Todos" class="main-card">
		<b-input-group class="mt-3">
			<template #prepend>
				<b-input-group-text>
					<b-checkbox></b-checkbox>
				</b-input-group-text>
			</template>
			<b-input placeholder="Type a new task title here" v-model="newTask.title" @keyup.enter="createTask" autofocus></b-input>
		</b-input-group>

		<div class="pt-3">
			<Tasks class="mb-3"></Tasks>

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
import { mapActions } from "vuex";

export default {
	name: "DefaultLayout",
	data() {
		return {
			newTask: {
				title: null,
				completed: false,
				edit: false
			},
		};
	},
	methods: {
		...mapActions("todos", ["getTodos", "handleTask"]),
		async createTask() {
			const task = JSON.parse(JSON.stringify(this.newTask))
			await this.handleTask({ task: task, action: "POST" });
			this.newTask.title = null;
		},
	},
	created() {
		this.getTodos();
	},
};
</script>
