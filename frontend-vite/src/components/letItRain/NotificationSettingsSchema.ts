// JSON Schema for the notification settings form
export const notificationSchema = {
  type: 'object',
  properties: {
    notificationMethods: {
      type: 'object',
      properties: {
        email: {
          type: 'boolean',
          default: false
        },
        push: {
          type: 'boolean',
          default: false
        }
      }
    },
    reminders: {
      type: 'object',
      properties: {
        beforeEachTask: {
          type: 'object',
          properties: {
            enabled: {
              type: 'boolean',
              default: false
            },
            days: {
              type: 'integer',
              minimum: 1,
              default: 1
            }
          }
        },
        beforeEachWeek: {
          type: 'object',
          properties: {
            enabled: {
              type: 'boolean',
              default: false
            },
            days: {
              type: 'integer',
              minimum: 1,
              default: 1
            }
          }
        }
      }
    },
    saveToProfile: {
      type: 'boolean',
      default: false
    }
  }
};

// UI Schema for controlling the layout and appearance
export const notificationUiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Group',
      label: '',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/notificationMethods/properties/email',
              label: 'notifications.email',
              options: {
                showUnfocusedDescription: false
              }
            },
            {
              type: 'Control',
              scope: '#/properties/notificationMethods/properties/push',
              label: 'notifications.push',
              options: {
                showUnfocusedDescription: false
              }
            }
          ]
        }
      ]
    },
    {
      type: 'Group',
      label: '',
      options: {
        showIfProperty: {
          type: 'OR',
          conditions: [
            { scope: '#/properties/notificationMethods/properties/email', schema: { const: true } },
            { scope: '#/properties/notificationMethods/properties/push', schema: { const: true } }
          ]
        }
      },
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/reminders/properties/beforeEachTask/properties/enabled',
              label: 'notifications.beforeEachTask'
            },
            {
              type: 'Control',
              scope: '#/properties/reminders/properties/beforeEachTask/properties/days',
              label: '',
              options: {
                showIfProperty: '#/properties/reminders/properties/beforeEachTask/properties/enabled',
                showUnfocusedDescription: false
              }
            }
          ]
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/reminders/properties/beforeEachWeek/properties/enabled',
              label: 'notifications.beforeEachWeek'
            },
            {
              type: 'Control',
              scope: '#/properties/reminders/properties/beforeEachWeek/properties/days',
              label: '',
              options: {
                showIfProperty: '#/properties/reminders/properties/beforeEachWeek/properties/enabled',
                showUnfocusedDescription: false
              }
            }
          ]
        }
      ]
    },
    {
      type: 'Control',
      scope: '#/properties/saveToProfile',
      label: 'notifications.saveToProfile'
    }
  ]
};

// Initial data for the form
export const initialData = {
  notificationMethods: {
    email: false,
    push: false
  },
  reminders: {
    beforeEachTask: {
      enabled: false,
      days: 1
    },
    beforeEachWeek: {
      enabled: false,
      days: 1
    }
  },
  saveToProfile: false
};