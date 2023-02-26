// ІМПОРТУЄМО БІБЛІОТЕКИ БЕЗ ЯКИХ НЕ МОЖЕМО ПИСАТИ КОД
import React from "react";
import styled from "styled-components";

// ІМПОРТУЄМО ПОТРІБНІ КОМПОНЕНТИ
import Page from "./component/Page";
import Header from "./component/Header";
import Balance from "./component/Balance";
import Menu from "./component/Menu";
import Payment from "./component/Payment";

// КОНФІГУРАЦІЯ ========================================

const START_BALANCE = 0;
const LIMIT_BALANCE = 100000000000000;
const GET_MONEY = 100;
const SALLARY_AMOUNT = 1000;
const COURCE_PRICE = 800;
const FOOD = 300;

export default function App() {
  // ФУНКЦІОНАЛ БАЛАНСУ ========================

  // Ось тут тримаємо актуальне значення балансу

  const [balance, setBalance] = React.useState(START_BALANCE);

  // Функція для прямого поповнення балансу
  const getMoney = () => {
    setBalance(balance + GET_MONEY);
    setpeyment([
      {
        name: "Задонатили родичі",
        amount: GET_MONEY,
        type: "+"
      },
      ...payment
    ]);
  };

  // Функція яка виконується кожен раз коли наш баланс змінився
  React.useEffect(() => {
    // Перевірка на ліміт балансу
    if (balance > LIMIT_BALANCE) {
      alert(`Ваш ліміт балансу: ${LIMIT_BALANCE}`);
      setBalance(START_BALANCE);
    }

    // Перевірка на мінусовий баланс
    if (balance < 0) {
      alert(`Ви використали усі свої гроші. Поповніть картку`);
      // setBalance(0);
    }
    // Сюди записуються змінні при оновленні яких буде виконуватися функція
  }, [balance]);

  const [payment, setpeyment] = React.useState([]);
  // ВЕРСТКА ІНТЕРФЕЙСУ ==========================================
  const getSallary = () => {
    setBalance(balance + SALLARY_AMOUNT);
    setpeyment([
      {
        name: "Зарплата",
        amount: SALLARY_AMOUNT,
        type: "+"
      },
      ...payment
    ]);
  };

  const getCource = () => {
    setBalance(balance - COURCE_PRICE);
    setpeyment([
      {
        name: "Купівля ЛОХ-пакету",
        amount: COURCE_PRICE,
        type: "-"
      },
      ...payment
    ]);
  };

  const buyFood = () => {
    setBalance(balance - FOOD);
    setpeyment([
      {
        name: "ЇЖА",
        amount: FOOD,
        type: "***"
      },
      ...payment
    ]);
  };

  const LOGIN = "login";
  const PASSWORD = "1234";
  const [isLogged, setLogged] = React.useState(false);
  // ця функція відкриває вікно в браузері з текстом
  const doLogin = () => {
    const login = prompt("Ваш логін");
    const password = prompt("Пароль");
    if (login === LOGIN && password === PASSWORD) {
      alert("Ви увійшли!!!");
      setLogged(true);
    } else {
      if (login !== LOGIN && password !== PASSWORD) {
        return alert("Помилка в логіні і паролі!!!");
      }

      if (login !== LOGIN) {
        return alert("Помилка в логіні!!!");
      }

      if (password !== PASSWORD) {
        return alert("Помилка в логіні!!!");
      }
    }
  };

  return (
    <Page>
      {/* компонент шапки з нашою назвою
          також при кліку мишкою на шапку
          в нас визивається функція HelloWorld
      */}

      <Header name="Alex BANK" onClick={doLogin} />

      {/* Компонент баланса в який передається
          Актуальне значення балансу  */}
      {isLogged && <Balance balance={balance} />}

      {/* Компонент меню з кнопками */}
      {isLogged && (
        <Menu
          // ось сюди ми передаємо конфігурацію кнопок
          config={[
            {
              name: "Поповнити баланс",
              onClick: getMoney,
              img: "/icon/payment.svg"
            },

            {
              name: "Отримати зарплату",
              onClick: getSallary,
              img: "/icon/another.svg"
            },

            {
              name: "Купити ЛОХ-пакет",
              onClick: getCource,
              img: "/icon/fish.svg"
            },

            {
              name: "Купити їжу",
              onClick: buyFood,
              img: "/icon/apple.svg"
            }
          ]}
        />
      )}
      {/* компонент списка наших транзакцій
          цей функціонал ми будемо робити на 3 уроці
      */}
      {isLogged && <Payment payment={payment} />}
      {isLogged === false && <NotLogged>Вам необхідно увійти</NotLogged>}
    </Page>
  );
}

const NotLogged = styled.div`
  padding: 100px 30px;
  background: #000;
  color: #fff;
  text-align: center;
  margin-top: 100px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;
