<?php


$agents = array(
	'Jane Doe',
	'Petar Milinkovic',
	'Zeljko Lazic',
	'Djurdja Peric',
	'Milica Petkovic',
	'Djordje Marjanovic',
	'Ivic Aleksandar',
	'John Smith'
);

$clients = array(
	'Tywin Lannister',
	'Opasan Bakic',
	'Dimitrije Tucovic',
	'Zeljana Djamilovic',
	'Dnevni Dosadnjakovic',
	'Billy the kid',
	'Djamilj Eferic'
);

$callTypes = array(
	'phone',
	'video'
);

$callDirection = array(
	'inbound',
	'outbound'
);


$skills = array(
	'hard skills ­ products',
	'soft skills ­ communication',
	'call technique'
);

/**

callMedias: {
audioFile: '/call1.mp3'
},
evaluation: {
customerScore: 3,
managerScore: 4,
totalScore: 3.5,
improvement: 'Soft skills ­ communication',
resume: 'This agent satisfies Aristotle\'s conditions.But because she is also simultaneously blameless'
}
}
];
 */

$data = array(
	'callID' => 0,
	'callType' => 'phone',
	'callDirection' => 'inbound',
	'agent' => array(
		'agentID' => 'jdoe',
		'agentName' => 'Jane Doe'
	),
	'client' => array(
		'clientID' => 'customer1',
		'clientName' => 'Tywin Lannister'
	),
	'callStart' => 'Wed Dec 10 2014 13:30:09 GMT+0200',
	'callEnd' => 'Wed Dec 10 2014 13:35:09 GMT+0200',
	'callMedias' => array(
		'audioFile' => 'item_1.mp3'
	),
	'evaluation' => array(
		'customerScore' => 3,
		'managerScore' => 4,
		'totalScore' => 4.5,
		'improvement' => 'Soft skills comunication',
		'resume' => 'some random text'
	)
);

function generateRandomString($length = 15)
{
	return substr(sha1(rand()), 0, $length);
}

$res = array();

$length = 240;
$id = 0;
while($length--) {
	$id++;
	$clientID = mt_rand(0,6);
	$agent = $agents[mt_rand(0,7)];
	$client = $clients[$clientID];

	$scoresCustom = mt_rand(1,10);
	$scoresManager = mt_rand(1,10);

	$startTime = strtotime('Fri Oct 10 2014 '. mt_rand(1,24). ':'.mt_rand(10,60) .':09 +'.$id.' days');
	$endTime = strtotime('+'. mt_rand(1, 120). ' minutes', $startTime);
	$tmp = array(
		'callID' => $id,
		'callType' => (mt_rand(0,2) === 1) ? 'video' : 'phone',
		'callDirection' => (mt_rand(0,1) === 1) ? 'inbound' : 'outbound',
		'agent' => array(
			'agentID' => str_replace(' ', '_', strtolower($agent)),
			'agentName' => $agent
		),
		'client' => array(
			'clientID' => 'customer' . $clientID,
			'clientName' => $client
		),
		'callStart' => date('D M d Y H:i:s \G\M\T\+\0\2\0\0', $startTime),
		'callEnd' => date('D M d Y H:i:s \G\M\T\+\0\2\0\0', $endTime),
		'callMedias' => array(
			'audioFile' => 'item_'.mt_rand(1,5).'.mp3'
		),
		'evaluation' => array(
			'customerScore' => $scoresCustom,
			'managerScore' => $scoresManager,
			'totalScore' => ($scoresCustom + $scoresManager) / 2,
			'improvement' => $skills[mt_rand(0,2)],
			'resume' => generateRandomString(mt_rand(30, 500))
		)
	);

	$res[] = $tmp;
}

print json_encode($res);