export const addTestId = (selectId, testId) => {
    const selectEle = document.getElementById(selectId);
    const childrenCount = selectEle.children.length;
    const hiddenEle = selectEle.children[childrenCount - 1];
    hiddenEle.dataset.testid = testId;
};
