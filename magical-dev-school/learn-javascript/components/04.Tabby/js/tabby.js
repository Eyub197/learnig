export default class Taby {
  constructor(tabby) {
    this.tabby = tabby;
    this.tabsList = this.tabby.querySelector("[role='tablist']");
    this.tabs = [...this.tabsList.querySelectorAll("[role='tab']")];
    this.tabPanels = [...this.tabby.querySelectorAll('[role="tabpanel"]')];

    this.tabsList.addEventListener("click", this.handleTabSwitch);
    this.tabsList.addEventListener("keydown", this.handleTab);
    this.tabsList.addEventListener("keydown", this.handleLeftAndRightKey);
  }

  getTabPanel(target) {
    return this.tabby.querySelector(`[aria-labelledby="${target}"]`);
  }

  getNextTab(index) {
    if (index !== this.tabs.length - 1) return this.tabs[index + 1];
  }

  getPreviousTab(index) {
    if (index !== 0) return this.tabs[index - 1];
  }

  selectTab(tab) {
    const target = tab.dataset.target;
    const previousTab = this.tabsList.querySelector("[aria-selected='true']");
    previousTab.classList.remove("[aria-selected='true']");
    tab.classList.add("[aria-selected='true']");
    this.tabs.forEach((tab) => {
      tab.setAttribute("tabindex", "-1");
      tab.setAttribute("aria-selected", "false");
    });

    tab.setAttribute("aria-selected", "true");
    tab.removeAttribute("tabindex");

    const currentTabPanel = this.getTabPanel(target);

    this.tabPanels.forEach((tabContent) =>
      tabContent.setAttribute("hidden", "true"),
    );
    currentTabPanel.removeAttribute("hidden");
  }

  handleTabSwitch = (event) => {
    if (!event.target.closest("[role='tab']")) return;
    const tab = event.target;
    this.selectTab(tab);
  };

  handleTab = (event) => {
    const { key } = event;

    if (event.shiftKey) return;

    if (key !== "Tab" && key !== "ArrowDown") return;
    const currentTabIndex = tabs.findIndex(
      (tab) => tab.getAttribute("aira-selected") === "true",
    );

    if (tabPanels[currentTabIndex]) {
      tabPanels[currentTabIndex].focus();
      event.preventDefault();
    }
  };

  handleLeftAndRightKey = (event) => {
    const key = event.key;

    if (key !== "ArrowRight" && key !== "ArrowLeft") return;

    const currentTab = this.tabsList.querySelector("[aria-selected='true']");
    const tabIndex = this.tabs.findIndex((tab) => tab === currentTab);

    let targetTab;
    if (key === "ArrowRight") targetTab = this.getNextTab(tabIndex);
    if (key === "ArrowLeft") targetTab = this.getPreviousTab(tabIndex);

    if (targetTab) {
      targetTab.click();
    }
  };
}
