<template>
	<div class="tasks-container">
		<b-list-group>
			<b-list-group-item :style="task.completed ? 'opacity: 0.4' : ''" @dblclick="setEditableMode(task)" v-for="task in filteredTodos" :key="task.id">
				<div class="pr-3 d-inline">
					<b-icon icon="check2" font-scale="1.2" class="cursor-pointer" :variant="task.completed ? 'success' : 'secondary'" v-b-tooltip.hover="task.completed ? 'Task already completed' : 'Mark as completed'" @click="handleTask({ task: task, action: 'UPDATE' })"></b-icon>
				</div>

				<b-input v-model="task.title" v-if="task.edit"></b-input>
				<span v-else>
					{{ task.title }}
				</span>

				<b-icon icon="x" font-scale="1.2" class="float-right delete-icon" @click="handleTask({ task: task, action: 'DELETE' })" v-if="!task.completed"></b-icon>
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
			if (this.$route.name === "index") {
				return this.todos;
			} else if (this.$route.name === "active") {
				return this.todos.filter((item) => !item.completed);
			} else if (this.$route.name === "completed") {
				return this.todos.filter((item) => item.completed);
			}
		},
	},
	watch: {
		todos(newValue) {
            console.log("🚀 ~ file: Tasks.vue ~ line 46 ~ todos ~ newValue", newValue)
			if (newValue) {
				this.$forceUpdate()
			}			
		}
	},
	data() {
		return {
			lastEditedTask: {},
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
