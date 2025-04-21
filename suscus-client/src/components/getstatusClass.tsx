export const getStatusClass = (status: string) => {
    switch (status) {
      case "Новый":
        return "status-new";
      case "В работе":
        return "status-in-progress";
      case "На удержании":
        return "status-on-hold";
      case "Готов":
        return "status-ready";
      case "Отказ":
        return "status-rejected";
      default:
        return "";
    }
  };
  