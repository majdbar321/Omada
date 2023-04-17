export const handleSelectItem = (list, index, selectedExtension, setDummyFolderList, setDummyDocList) => {
    const updatedList = list.map((item, idx) => ({
      ...item,
      selected: idx === index,
    }));
  
    if (selectedExtension.name === 'Google Drive') {
      setDummyFolderList(updatedList);
    } else {
      setDummyDocList(updatedList);
    }
  };
  
  export const renderListItem = (list, index, selectedExtension, handleSelectItem) => {
    if (!list) {
      return null;
    }
  
    const item = list[index];
  
    if (!item) {
      return null;
    }
  
    const itemName = item.name || 'Untitled';
  
    return (
      <li key={index} className="list-item">
        <input
          type="radio"
          id={`${selectedExtension.name}-item-${index}`}
          checked={item.selected}
          onChange={() => handleSelectItem(list, index)}
        />
        <label htmlFor={`${selectedExtension.name}-item-${index}`}>
          {itemName}
        </label>
      </li>
    );
  };
  
  
  