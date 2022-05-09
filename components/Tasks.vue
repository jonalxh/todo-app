<template>
	<div class="tasks-container">
		<b-list-group>
			<b-list-group-item :style="task.completed ? 'opacity: 0.4' : ''" @dblclick="task.completed ? null : setEditableMode(task)" v-for="task in filteredTodos" :key="task.id">
				<b-row class="align-items-center">
					<b-col cols="1">
						<b-icon icon="check2" font-scale="1.2" class="cursor-pointer" :variant="task.completed ? 'success' : 'secondary'" v-b-tooltip.hover="task.completed ? 'Task already completed' : 'Mark as completed'" @click="handleTask({ task: { ...task, completed: true }, action: 'PUT' })"></b-icon>
					</b-col>
					<b-col>
						<b-input v-model="newTaskTitle" v-if="task.edit" @keyup.enter="updateTask(task)"></b-input>

						<span v-else>
							{{ task.title }}
						</span>
					</b-col>
					<b-col cols="1" v-if="!task.completed || !task.edit">
						<b-icon icon="x" font-scale="1.2" class="delete-icon" @click="handleTask({ task: task, action: 'DELETE' })"></b-icon>
					</b-col>
				</b-row>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
import { BIcon, BIconCheck2, BIconX } from "bootstrap-vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
	components: {
		BIcon,
		BIconCheck2,
		BIconX,
	},
	computed: {
		...mapState({
			todos: (state) => state.todos.allTodos,
		}),
		filteredTodos() {
			if (this.$route) {
				if (this.$route.name === "index") {
					return this.todos;
				} else if (this.$route.name === "active") {
					return this.todos.filter((item) => !item.completed);
				} else if (this.$route.name === "completed") {
					return this.todos.filter((item) => item.completed);
				}
			}
		},
	},
	data() {
		return {
			lastEditedTask: null,
			newTaskTitle: null,
		};
	},

	methods: {
		...mapActions("todos", ["handleTask"]),
		...mapMutations("todos", ["setTaskEditable"]),
		setEditableMode(task) {
			if (this.lastEditedTask) {
				this.setTaskEditable({
					task: this.lastEditedTask,
					edit: false,
				});
			}

			this.setTaskEditable({
				task: task,
				edit: true,
			});

			this.lastEditedTask = task;
			this.newTaskTitle = task.title;
		},
		updateTask(task) {
			this.handleTask({
				task: {
					...task,
					edit: false,
					title: this.newTaskTitle,
				},
				action: "PUT",
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
