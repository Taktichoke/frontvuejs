<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function addUser() {
  userStore.dialog = true
}

function updateUser(id) {
  userStore.dialog = true
  userStore.editUser(id)
}
function closeDialog() {
  userStore.dialog = false
  userStore.clearUser()
}
</script>

<template>
  <v-responsive class="border rounded" max-height="auto">
    <v-app :theme="theme">
      <v-app-bar class="px-3">
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-row>
            <v-col offset="11">
              <v-btn color="success" prepend-icon="mdi-plus" @click="addUser()">Add</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ชื่อ</th>
                    <th>นามสกุล</th>
                    <th>ชื่อผู้ใช้</th>
                    <th>เครื่องมือ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item of userStore.users" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.fname }}</td>
                    <td>{{ item.lname }}</td>
                    <td>{{ item.username }}</td>
                    <td>
                      <v-btn color="primary" class="mr-1" @click="updateUser(item.id)"
                        >อัพเดท</v-btn
                      >
                      <v-btn color="error" @click="userStore.deleteUser(item.id)">ลด</v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
          <v-dialog v-model="userStore.dialog" max-width="600">
            <v-card prepend-icon="mdi-account" title="User Profile">
              <!-- <v-form v-model="form"> -->
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="userStore.fname"
                      label="First name*"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="userStore.lname"
                      label="Last name*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="userStore.username"
                      label="User name*"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <small class="text-caption text-medium-emphasis">*indicates required field</small>
              </v-card-text>
              <!-- </v-form> -->

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Close" variant="plain" @click="closeDialog()"></v-btn>

                <v-btn
                  color="primary"
                  text="Save"
                  variant="tonal"
                  @click="userStore.saveUser"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped></style>
