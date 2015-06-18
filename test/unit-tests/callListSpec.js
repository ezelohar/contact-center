'use strict';

var dummyData = [
	{
		"callID": 1,
		"callType": "phone",
		"callDirection": "inbound",
		"agent": {
			"agentID": "ivic_aleksandar",
			"agentName": "Ivic Aleksandar"
		},
		"client": {
			"clientID": "customer5",
			"clientName": "Billy the kid"
		},
		"callStart": "Sat Oct 11 2014 17:37:09 GMT+0200",
		"callEnd": "Sat Oct 11 2014 17:48:09 GMT+0200",
		"callMedias": {
			"audioFile": "item_3.mp3"
		},
		"evaluation": {
			"customerScore": 7,
			"managerScore": 3,
			"totalScore": 5,
			"improvement": "soft skills \u00ad communication",
			"resume": "6e0c73996ad3f3f9e0d5c3750512554ec1593937"
		}
	},
	{
		"callID": 2,
		"callType": "phone",
		"callDirection": "inbound",
		"agent": {
			"agentID": "milica_petkovic",
			"agentName": "Milica Petkovic"
		},
		"client": {
			"clientID": "customer6",
			"clientName": "Djamilj Eferic"
		},
		"callStart": "Sun Oct 12 2014 17:41:09 GMT+0200",
		"callEnd": "Sun Oct 12 2014 18:52:09 GMT+0200",
		"callMedias": {
			"audioFile": "item_3.mp3"
		},
		"evaluation": {
			"customerScore": 9,
			"managerScore": 1,
			"totalScore": 5,
			"improvement": "call technique",
			"resume": "702f1f0fffb43662e792e2e531d125a32eb7323a"
		}
	},
	{
		"callID": 3,
		"callType": "phone",
		"callDirection": "outbound",
		"agent": {
			"agentID": "jane_doe",
			"agentName": "Jane Doe"
		},
		"client": {
			"clientID": "customer2",
			"clientName": "Dimitrije Tucovic"
		},
		"callStart": "Mon Oct 13 2014 06:53:09 GMT+0200",
		"callEnd": "Mon Oct 13 2014 08:49:09 GMT+0200",
		"callMedias": {
			"audioFile": "item_3.mp3"
		},
		"evaluation": {
			"customerScore": 8,
			"managerScore": 7,
			"totalScore": 7.5,
			"improvement": "hard skills \u00ad products",
			"resume": "cf8add7325fd2197c1fa2772c213b3af81b9a026"
		}
	},
	{
		"callID": 4,
		"callType": "video",
		"callDirection": "outbound",
		"agent": {
			"agentID": "zeljko_lazic",
			"agentName": "Zeljko Lazic"
		},
		"client": {
			"clientID": "customer4",
			"clientName": "Dnevni Dosadnjakovic"
		},
		"callStart": "Tue Oct 14 2014 03:23:09 GMT+0200",
		"callEnd": "Tue Oct 14 2014 04:24:09 GMT+0200",
		"callMedias": {
			"audioFile": "item_1.mp3"
		},
		"evaluation": {
			"customerScore": 8,
			"managerScore": 4,
			"totalScore": 6,
			"improvement": "hard skills \u00ad products",
			"resume": "c9e945c7f15aca20ed5128ec08bbe3bf518d7e00"
		}
	},
	{
		"callID": 5,
		"callType": "video",
		"callDirection": "outbound",
		"agent": {
			"agentID": "zeljko_lazic",
			"agentName": "Zeljko Lazic"
		},
		"client": {
			"clientID": "customer2",
			"clientName": "Dimitrije Tucovic"
		},
		"callStart": "Wed Oct 15 2014 15:30:09 GMT+0200",
		"callEnd": "Wed Oct 15 2014 16:04:09 GMT+0200",
		"callMedias": {
			"audioFile": "item_5.mp3"
		},
		"evaluation": {
			"customerScore": 6,
			"managerScore": 9,
			"totalScore": 7.5,
			"improvement": "call technique",
			"resume": "9f3067ee75c87891f27bab15dcc18ab8292cc14d"
		}
	},
	{
		"callID": 6,
		"callType": "phone",
		"callDirection": "outbound",
		"agent": {
			"agentID": "djurdja_peric",
			"agentName": "Djurdja Peric"
		},
		"client": {
			"clientID": "customer3",
			"clientName": "Zeljana Djamilovic"
		},
		"callStart": "Thu Oct 16 2014 12:55:09 GMT+0200",
		"callEnd": "Thu Oct 16 2014 13:12:09 GMT+0200",
		"callMedias": {
			"audioFile": "item_4.mp3"
		},
		"evaluation": {
			"customerScore": 1,
			"managerScore": 5,
			"totalScore": 3,
			"improvement": "hard skills \u00ad products",
			"resume": "edbce04bc6c4495eb5a0b263b1bda0ed8f5d7a55"
		}
	},
	{
		"callID": 7,
		"callType": "video",
		"callDirection": "outbound",
		"agent": {
			"agentID": "petar_milinkovic",
			"agentName": "Petar Milinkovic"
		},
		"client": {
			"clientID": "customer6",
			"clientName": "Djamilj Eferic"
		},
		"callStart": "Thu Jan 01 1970 01:00:00 GMT+0200",
		"callEnd": "Thu Jan 01 1970 01:34:00 GMT+0200",
		"callMedias": {
			"audioFile": "item_5.mp3"
		},
		"evaluation": {
			"customerScore": 3,
			"managerScore": 6,
			"totalScore": 4.5,
			"improvement": "call technique",
			"resume": "b2d2ea6dc0af0d593bb253face18ade6cd83c8a2"
		}
	},
	{
		"callID": 8,
		"callType": "video",
		"callDirection": "outbound",
		"agent": {
			"agentID": "john_smith",
			"agentName": "John Smith"
		},
		"client": {
			"clientID": "customer0",
			"clientName": "Tywin Lannister"
		},
		"callStart": "Sat Oct 18 2014 07:27:09 GMT+0200",
		"callEnd": "Sat Oct 18 2014 08:03:09 GMT+0200",
		"callMedias": {
			"audioFile": "item_4.mp3"
		},
		"evaluation": {
			"customerScore": 8,
			"managerScore": 7,
			"totalScore": 7.5,
			"improvement": "soft skills \u00ad communication",
			"resume": "3357b75124513d7fa649e519a744dc5e36dc149e"
		}
	},
	{
		"callID": 9,
		"callType": "phone",
		"callDirection": "outbound",
		"agent": {
			"agentID": "petar_milinkovic",
			"agentName": "Petar Milinkovic"
		},
		"client": {
			"clientID": "customer0",
			"clientName": "Tywin Lannister"
		},
		"callStart": "Sun Oct 19 2014 10:58:09 GMT+0200",
		"callEnd": "Sun Oct 19 2014 12:41:09 GMT+0200",
		"callMedias": {
			"audioFile": "item_1.mp3"
		},
		"evaluation": {
			"customerScore": 4,
			"managerScore": 6,
			"totalScore": 5,
			"improvement": "soft skills \u00ad communication",
			"resume": "8be8ac38f010e02f7f4bdb837ec93c778b356ac0"
		}
	},
	{
		"callID": 10,
		"callType": "video",
		"callDirection": "inbound",
		"agent": {
			"agentID": "milica_petkovic",
			"agentName": "Milica Petkovic"
		},
		"client": {
			"clientID": "customer6",
			"clientName": "Djamilj Eferic"
		},
		"callStart": "Mon Oct 20 2014 19:35:09 GMT+0200",
		"callEnd": "Mon Oct 20 2014 20:26:09 GMT+0200",
		"callMedias": {
			"audioFile": "item_2.mp3"
		},
		"evaluation": {
			"customerScore": 4,
			"managerScore": 3,
			"totalScore": 3.5,
			"improvement": "call technique",
			"resume": "ce32740822d03e133168c303cefb14b0e037ceb7"
		}
	},
	{
		"callID": 11,
		"callType": "phone",
		"callDirection": "outbound",
		"agent": {
			"agentID": "djordje_marjanovic",
			"agentName": "Djordje Marjanovic"
		},
		"client": {
			"clientID": "customer0",
			"clientName": "Tywin Lannister"
		},
		"callStart": "Tue Oct 21 2014 20:57:09 GMT+0200",
		"callEnd": "Tue Oct 21 2014 22:53:09 GMT+0200",
		"callMedias": {
			"audioFile": "item_4.mp3"
		},
		"evaluation": {
			"customerScore": 2,
			"managerScore": 7,
			"totalScore": 4.5,
			"improvement": "hard skills \u00ad products",
			"resume": "34cabc3b5ce49cd6f8b849974a27d8a1a8ab1ff1"
		}
	},
	{
		"callID": 12,
		"callType": "video",
		"callDirection": "inbound",
		"agent": {
			"agentID": "milica_petkovic",
			"agentName": "Milica Petkovic"
		},
		"client": {
			"clientID": "customer2",
			"clientName": "Dimitrije Tucovic"
		},
		"callStart": "Wed Oct 22 2014 12:59:09 GMT+0200",
		"callEnd": "Wed Oct 22 2014 13:14:09 GMT+0200",
		"callMedias": {
			"audioFile": "item_1.mp3"
		},
		"evaluation": {
			"customerScore": 1,
			"managerScore": 7,
			"totalScore": 4,
			"improvement": "call technique",
			"resume": "86f87d66b1f79edfbd5a89d3444fb354cc2ae7c5"
		}
	},
	{
		"callID": 13,
		"callType": "video",
		"callDirection": "outbound",
		"agent": {
			"agentID": "john_smith",
			"agentName": "John Smith"
		},
		"client": {
			"clientID": "customer0",
			"clientName": "Tywin Lannister"
		},
		"callStart": "Thu Oct 23 2014 16:53:09 GMT+0200",
		"callEnd": "Thu Oct 23 2014 18:33:09 GMT+0200",
		"callMedias": {
			"audioFile": "item_1.mp3"
		},
		"evaluation": {
			"customerScore": 2,
			"managerScore": 4,
			"totalScore": 3,
			"improvement": "soft skills \u00ad communication",
			"resume": "3dc5a7005ca2fb0fb6c372521bac3d004e60e8cf"
		}
	}
];

var dummySearchObject = {
	agentID: '',
	score: 2,
	duration: 0,
	callAgo: 0
};

describe("Data Manager Test", function(){

	var dataManager, scope;

	beforeEach(function() {
		module('ContactCenter');
	});


	beforeEach(function() {
		inject(function(_$rootScope_, _dataManager_) {
			scope = _$rootScope_;
			dataManager = _dataManager_;
		});
	});

	it('should have dataManager service defined', function () {
		expect(dataManager).toBeDefined();
	});

	describe('_getFromLocalStorage', function () {
		it('response shouldn\'t be undefined', function() {
			expect(dataManager._getFromLocalStorage()).toBeDefined();
		})
	});

	describe('inLocalStorage', function () {
		it('should be false for filters', function () {
			expect(dataManager.inLocalStorage()).toBeFalse();
		});
	});

	describe('saveCalls', function () {
		it('should save data to local storage and return array of objects and not be empty', function () {
			expect(dataManager.saveCalls(dummyData)).toBeNonEmptyArray();
			expect(dataManager.saveCalls(dummyData)).toBeArrayOfObjects();
		});
	});

	// no empty data in future

	describe('get', function () {
		it('should return data from saved object', function () {
			var res;

			dataManager.get().then(function (data) {
				res = data;
			});

			scope.$apply();
			expect(res).toBeNonEmptyArray();
		});
	});

	describe('filterData', function () {
		it('should be empty for score 2 on dummy data', function () {
			var res;

			dataManager.filterData({score: 2}, true).then(function (data) {
				res = data;
			});

			scope.$apply();

			//first case should be empty array
			expect(res).toBeEmptyArray();
		})

		it('should have 2 results for agentID = lazic on dummy data', function () {
			var res;

			dataManager.filterData({agentID: 'lazic'}, true).then(function (data) {
				res = data;
			});

			scope.$apply();

			//first case should be empty array
			expect(res).toBeArrayOfSize(2);
		})
	})


});