<template>
	<div class="tasks-container">
		<b-list-group>
			<b-list-group-item :style="task.completed ? 'opacity: 0.4' : ''" @dblclick="setEditableMode(task)" v-for="(task, index) in filteredTodos" :key="task.id">
				<div class="pr-3 d-inline">
					<b-icon icon="check2" font-scale="1.2" class="cursor-pointer" :variant="task.completed ? 'success' : 'secondary'" v-b-tooltip.hover="task.completed ? 'Task already completed' : 'Mark as completed'"></b-icon>
				</div>

				<b-input v-model="task.title" v-if="task.edit"></b-input>
				<span v-else>
					{{ task.title }}
				</span>

				<b-icon icon="x" font-scale="1.2" class="float-right delete-icon" @click="deleteTask(index, task)"></b-icon>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
import { BIcon, BIconCheck2, BIconX } from "bootstrap-vue";

export default {
	props: {
		todos: {
			type: Array,
			required: true,
		},
	},
	components: {
		BIcon,
		BIconCheck2,
		BIconX,
	},
	computed: {
		filteredTodos() {
			if (this.$route.name === "index") {
				return this.todos;
			} else if (this.$route.name === "active") {
				return this.todos.filter((item) => !item.completed);
			} else if (this.$route.name === "completed") {
				return this.todos.filter((item) => item.completed);
			}
		},
	},
	data() {
		return {
			lastEditedTask: {},
		};
	},
	methods: {
		setEditableMode(task) {
			const tempTask = this.filteredTodos.filter((todo) => todo.id === task.id);
			tempTask.edit = true;
			this.lastEditedTask.edit = false;
			this.lastEditedTask = task;
		},
		deleteTask(index, task) {
      this.$delete(this.todos, index, task)
			this.$axios.delete(`todos/${task.id}`).then((res) => {
				console.log("🚀 ~ file: Tasks.vue ~ line 58 ~ this.$axios.delete ~ res", res);
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.tasks-container {
	max-height: 100%;
	overflow-y: auto;
}
.list-group-item {
	.delete-icon {
		display: none;
	}
	&:hover .delete-icon {
		display: block;
	}
}
</style>
