const Account = require("../../models/Account");

const getAccount = async ({ filter, repository, userRepository, userId }) => {
  const result = await repository.get(filter);
  const accounts = result?.map((user) => new Account(user));

  let userInfo = null;
  if (userId && userRepository) {
    try {
      const user = await userRepository.getById(userId);
      console.log("Consultando o usuario: ", { user });

      if (user) {
        userInfo = {
          username: user.username,
          email: user.email,
        };
      }
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error.message);
    }
  }

  return {
    accounts,
    userInfo,
  };
};

module.exports = getAccount;
