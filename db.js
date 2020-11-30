module.exports = () => {
   const data = {
      testEvents: [],
      tests: [],
      component: [],
      users: [],
      batches: [],
      module: []
   }

   // generating users
   // Password encrypted by: https://bcrypt-generator.com/ (10rounds)
   data.users.push(
      {
         id: -1,
         email: 'test@mail.ch',
         // password: test
         password: '$2y$10$1xN7nW4dMGZ/VHX7yN8IdeKikI3ePezDeLRzBYn1ub4JVYWCYtQ6e',
         name: 'Test Engineer',
         role: 'Engineer'
      },
      {
         id: -2,
         email: 'operator@mail.ch',
         // password: test
         password: '$2y$10$1xN7nW4dMGZ/VHX7yN8IdeKikI3ePezDeLRzBYn1ub4JVYWCYtQ6e',
         name: 'Test Operator',
         role: 'Operator'
      },
      {
         id: 1,
         email: 'wieczorek@mail.ch',
         // password: 1234abc
         password: '$2y$10$FEBxBozQ0Ph6.0I3WF9OUuSx6ExURIJvYANURCLb6xvWtbadPUi2a',
         name: 'A. Wieczorek',
         role: 'Engineer'
      },
      {
         id: 2,
         email: 'kalatharan@mail.ch',
         // password: 1234xyz
         password: '$2y$10$Ie2BAmGoy8wqIl.IOglmgui0vGaa9P2xMrw/EC0R68UE9HjxzdIiu',
         name: 'B. Kalatharan',
         role: 'Operator'
      }
   )

   // generating components
   data.component.push(
      { id: 1, type: 'C_CE_X' },
      { id: 2, type: 'C8' },
      { id: 3, type: 'Chip' },
      { id: 4, type: 'Zenerdiodent' }
   )

   // generating modules
   data.module.push({ id: 1, articleNumber: '9140180' })

   // generating tests
   data.tests.push(
      {
         id: 1,
         name: 'Top-M4095',
         type: 'Sheartest: Destructive',
         speed: 500,
         load: 662,
         shearheight: 70,
         lowerLimit: 296,
         customUpperLimit: null,
         customLowerLimit: null,
         batches: []
      },
      {
         id: 2,
         name: 'BOT-M4095',
         type: 'Sheartest: Destructive',
         speed: 100,
         load: 227,
         shearheight: 100,
         lowerLimit: 113,
         customUpperLimit: null,
         customLowerLimit: null,
         batches: []
      },
      {
         id: 3,
         name: 'BOT-M4095.1',
         type: 'Sheartest: Destructive',
         speed: 500,
         load: 423,
         shearheight: 80,
         lowerLimit: 212,
         customUpperLimit: null,
         customLowerLimit: null,
         batches: []
      }
   )

   const NUMBER_OF_TESTEVENTS_PER_TEST = 40
   const NUMBER_OF_BATCHES_PER_TEST = 10
   const NUMBER_OF_COMPONENTS_PER_BATCH = 4
   const START_DATE = '2020-11-'
   let startTestEventId = 0
   let startBatchId = 0
   let componentIdShift = 0

   // generating batches
   data.tests.forEach((test) => {
      for (
         let batchId = startBatchId;
         batchId < startBatchId + NUMBER_OF_BATCHES_PER_TEST;
         batchId++
      ) {
         data.batches.push({
            id: batchId,
            batchNumber: batchId < 10 ? 'C2014000' + batchId : 'C201400' + batchId,
            module: 1
         })
         test.batches.push(batchId)
      }
      startBatchId += NUMBER_OF_BATCHES_PER_TEST
   })

   for (let testId = 1; testId <= 3; testId++) {
      // generating testEvents
      for (
         let testEventId = startTestEventId;
         testEventId < startTestEventId + NUMBER_OF_TESTEVENTS_PER_TEST;
         testEventId++
      ) {
         let lowerForce = data.tests[testId - 1].lowerLimit - 20
         let upperForce = lowerForce + 600
         let force = parseInt((Math.random() * (upperForce - lowerForce) + lowerForce).toFixed(2))
         let result = force > data.tests[testId - 1].lowerLimit ? 'PASS' : 'FAIL'
         let batchId = Math.floor(testEventId / NUMBER_OF_COMPONENTS_PER_BATCH)
         let date =
            batchId < 10
               ? START_DATE + '0' + batchId + ' 13:00:00'
               : START_DATE + batchId + ' 13:00:00'

         data.testEvents.push({
            id: testEventId,
            force: force,
            result: result,
            batchId: batchId,
            componentId: (testEventId % 4) + 1 + componentIdShift,
            date: date,
            userId: 1,
            testId: testId
         })
      }

      // generating batches

      startTestEventId += NUMBER_OF_TESTEVENTS_PER_TEST
      componentIdShift += 4
   }

   return data
}
