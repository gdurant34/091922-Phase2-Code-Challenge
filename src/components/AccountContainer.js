import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then(r => r.json())
      .then(setTransactions)
  }, [])

  function onAddTransaction(newTransaction) {
    setTransactions([...transactions, newTransaction])
  }

  const displayTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddTransactionForm onAddTransaction={onAddTransaction} />
      <TransactionsList transactions={displayTransactions} />
    </div>
  );
}

export default AccountContainer;