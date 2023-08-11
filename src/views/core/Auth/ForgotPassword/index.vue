<template>
  <div class="forgot-password-page">
    <table border="1">
      <thead>
        <tr>
          <th>Role</th>
          <th>Email</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Admin</td>
          <td>admin@gmail.com</td>
          <td>(any)</td>
        </tr>
        <tr>
          <td>User</td>
          <td>(any)</td>
          <td>(any)</td>
        </tr>
      </tbody>
    </table>

    <p>
      <router-link :to="{ name: 'login' }" class="button button-primary">Back to login</router-link>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.forgot-password-page {
  padding: 20px;
}

table {
  border-spacing: 0;

  th,
  td {
    padding: 10px;
  }
}
</style>
