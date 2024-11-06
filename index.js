const baseUrl = "https://teacherservice-awfggkftb9d3f3b8.northeurope-01.azurewebsites.net/api/Teachers"

Vue.createApp({
    data() {
        return {
            teachers: [],
            nameToGetBy: "",
            idToGetBy: -1,
            singleTeacher: null,
            deleteId: 0,
            deleteMessage: "",
            addData: { name: "", salary: 0 },
            addMessage: "",
            updateData: { id: 0, name: "", salary: 0 },
            updateMessage: ""
        }
    },
    methods: {
        getAllTeachers() {
            this.getTeachers(baseUrl)
        },
        getByName(name) { // filter teachers by name
            const url = `${baseUrl}?name=${name}`
            this.getTeachers(url)
        },
        async getTeachers(url) { // helper method for getAllTeachers and getByName
            try {
                const response = await axios.get(url)
                this.teachers = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async getById(id) {
            const url = `${baseUrl}/${id}`
            try {
                const response = await axios.get(url)
                this.singleTeacher = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async deleteTeacher(deleteId) {
            const url = `${baseUrl}/${deleteId}`
            try {
                const response = await axios.delete(url)
                this.deleteMessage = `${response.status} ${response.statusText}`
                this.getAllTeachers()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async addTeacher() {
            try {
                const response = await axios.post(baseUrl, this.addData)
                this.addMessage = `response ${response.status} ${response.statusText}`
                this.getAllTeachers()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async updateTeacher() {
            const url = `${baseUrl}/${this.updateData.id}`
            try {
                const response = await axios.put(url, this.updateData)
                this.updateMessage = `response ${response.status} ${response.statusText}`
                this.getAllTeachers()
            } catch (ex) {
                alert(ex.message)
            }
        }
    }
}).mount("#app")
